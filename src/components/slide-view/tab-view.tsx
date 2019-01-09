import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { PagerScroll } from './pager-scroll';
import { Scene, SceneRendererProps, Layout, TabViewProps, RouteBase } from './type-definitions';


type State = {
    layout: Layout & { measured: boolean };
    layoutXY: Animated.ValueXY;
    panX: Animated.Value;
    offsetX: Animated.Value;
    position: any;
};


export class TabView<T extends RouteBase = RouteBase> extends React.Component<TabViewProps<T>, State> {
    public static defaultProps = {
        canJumpToTab: () => true,
        renderPager: (props: any) => <PagerScroll {...props} />,
        getTestID: ({ route }: Scene<any>) => typeof route.testID === 'string' ? route.testID : undefined,
        initialLayout: { height: 0, width: 0 },
        useNativeDriver: false,
    };

    protected _mounted: boolean = false;
    protected _nextIndex?: number;

    public constructor(props: TabViewProps<T>) {
        super(props);

        const { navigationState } = this.props;
        const layout = {
            ...(this.props.initialLayout || { height: 0, width: 0 }),
            measured: false,
        };

        const panX = new Animated.Value(0);
        const offsetX = new Animated.Value(-navigationState.index * layout.width);
        const layoutXY = new Animated.ValueXY({
            x: layout.width || 0.001,
            y: layout.height || 0.001,
        });

        const position = Animated.multiply(
            Animated.divide(Animated.add(panX, offsetX), layoutXY.x),
            -1,
        );

        this.state = {
            layout: layout,
            layoutXY: layoutXY,
            panX: panX,
            offsetX: offsetX,
            position: position,
        };
    }

    public componentDidMount() {
        this._mounted = true;
    }

    public componentWillUnmount() {
        this._mounted = false;
    }

    protected _renderScene = (props: SceneRendererProps<T> & Scene<T>) => {
        return this.props.renderScene(props);
    };

    protected _handleLayout = (e: any) => {
        const { height, width } = e.nativeEvent.layout;

        if (
            this.state.layout.width === width &&
            this.state.layout.height === height
        ) {
            return;
        }

        this.state.offsetX.setValue(-this.props.navigationState.index * width);
        this.state.layoutXY.setValue({
            // This is hacky, but we need to make sure that the value is never 0
            x: width || 0.001,
            y: height || 0.001,
        });
        this.setState({
            layout: {
                measured: true,
                height,
                width,
            },
        });
    };

    protected _buildSceneRendererProps = (): SceneRendererProps<T> & any => {
        return {
            layout: this.state.layout,

            panX: this.state.panX,
            offsetX: this.state.offsetX,
            position: this.state.position,

            navigationState: this.props.navigationState,
            jumpTo: this._jumpTo,

            useNativeDriver: this.props.useNativeDriver === true,
        };
    };

    protected _jumpTo = (key: string) => {
        if (!this._mounted) {
            // We are no longer mounted, this is a no-op
            return;
        }

        const { canJumpToTab, navigationState } = this.props;
        const index = navigationState.routes.findIndex(route => route.key === key);

        if (!canJumpToTab || !canJumpToTab(navigationState.routes[index])) {
            return;
        }

        if (index !== navigationState.index) {
            this.props.onIndexChange(index);
        }
    };

    public render() {
        const {
            navigationState,
            onIndexChange,
            initialLayout,
            renderScene,
            renderPager,
            ...rest
        } = this.props;

        const props = this._buildSceneRendererProps();

        return (
            <View collapsable={false} style={[styles.container, this.props.style]}>
                <View onLayout={this._handleLayout} style={styles.pager}>
                    {renderPager && renderPager({
                        ...props,
                        ...rest,
                        panX: this.state.panX,
                        offsetX: this.state.offsetX,
                        children: navigationState.routes.map((route: RouteBase, index: number) => {
                            const focused = index === props.navigationState.index;

                            const scene = this._renderScene({
                                ...props,
                                index: index,
                                route: route,
                                focused: focused,
                            });

                            if (React.isValidElement(scene)) {
                                /* $FlowFixMe: https://github.com/facebook/flow/issues/4775 */
                                return React.cloneElement(scene, { key: route.key });
                            }

                            return scene;
                        }),
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    pager: {
        flex: 1,
    },
});
