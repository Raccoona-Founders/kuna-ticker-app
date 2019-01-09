import React from 'react';
import { View, ScrollView, StyleSheet, ScrollViewProps } from 'react-native';
import { PagerScrollProps, ScrollEvent, RouteBase } from './type-definitions';

type State = any & {
    initialOffset: { x: number, y: number },
};

export class PagerScroll<T extends RouteBase = RouteBase> extends React.Component<PagerScrollProps<T>, State> {
    public static defaultProps = {
        canJumpToTab: () => true,
    };

    protected _scrollView: React.RefObject<ScrollView> = React.createRef<ScrollView>();
    protected _idleCallback: any;
    protected _isIdle: boolean = true;
    protected _isInitial: boolean = true;


    public constructor(props: PagerScrollProps<T>) {
        super(props);

        const { navigationState, layout } = this.props;

        this.state = {
            initialOffset: {
                x: navigationState.index * layout.width,
                y: 0,
            },
        };
    }


    public componentDidMount(): void {
        this._setInitialPage();
    }


    public componentDidUpdate(prevProps: PagerScrollProps<T>): void {
        const amount = this.props.navigationState.index * this.props.layout.width;

        if (
            prevProps.navigationState.routes.length !==
            this.props.navigationState.routes.length ||
            prevProps.layout.width !== this.props.layout.width
        ) {
            this._scrollTo(amount, false);
        } else if (
            prevProps.navigationState.index !== this.props.navigationState.index
        ) {
            this._scrollTo(amount);
        }
    }


    protected _setInitialPage = () => {
        if (this.props.layout.width) {
            this._isInitial = true;
            this._scrollTo(
                this.props.navigationState.index * this.props.layout.width,
                false,
            );
        }

        setTimeout(() => {
            this._isInitial = false;
        }, 50);
    };


    protected _scrollTo = (x: number, animated = true) => {
        if (!this._isIdle || !this._scrollView.current) {
            return;
        }

        this._scrollView.current.scrollTo({ x, animated: animated && this.props.animationEnabled !== false });
    };


    protected _handleMomentumScrollEnd = (e: ScrollEvent) => {
        let nextIndex = Math.round(
            e.nativeEvent.contentOffset.x / this.props.layout.width,
        );

        const nextRoute = this.props.navigationState.routes[nextIndex];

        if (this.props.canJumpToTab({ route: nextRoute })) {
            this.props.jumpTo(nextRoute.key);
            this.props.onAnimationEnd && this.props.onAnimationEnd();
        } else {
            (global as any).requestAnimationFrame(() => {
                this._scrollTo(this.props.navigationState.index * this.props.layout.width);
            });
        }
    };


    protected _handleScroll = (e: ScrollEvent) => {
        if (this._isInitial || e.nativeEvent.contentSize.width === 0) {
            return;
        }

        const { navigationState, layout } = this.props;
        const offset = navigationState.index * layout.width;

        this.props.offsetX.setValue(-offset);
        this.props.panX.setValue(offset - e.nativeEvent.contentOffset.x);

        (global as any).cancelAnimationFrame(this._idleCallback);

        this._isIdle = false;
        this._idleCallback = (global as any).requestAnimationFrame(() => {
            this._isIdle = true;
        });
    };


    public render(): JSX.Element {
        const {
            children,
            layout,
            navigationState,
            onSwipeStart,
            onSwipeEnd,
            bounces = false,
        } = this.props;


        const scrollViewProps: ScrollViewProps & any = {
            ref: this._scrollView,

            horizontal: true,
            pagingEnabled: true,
            directionalLockEnabled: true,

            keyboardDismissMode: 'on-drag',
            keyboardShouldPersistTaps: 'always',
            overScrollMode: 'never',
            scrollEnabled: this.props.swipeEnabled,
            scrollEventThrottle: 1,
            contentOffset: this.state.initialOffset,
            bounces: bounces,
            style: styles.container,
            contentContainerStyle: layout.width ? null : styles.container,

            onScroll: this._handleScroll,
            onScrollBeginDrag: onSwipeStart,
            onScrollEndDrag: onSwipeEnd,
            onMomentumScrollEnd: this._handleMomentumScrollEnd,


            alwaysBounceHorizontal: false,
            scrollsToTop: false,
            showsHorizontalScrollIndicator: false,
            automaticallyAdjustContentInsets: false,
        };

        return (
            <ScrollView {...scrollViewProps}>
                {React.Children.map(children, (child: any, i: number) => {
                    const route = navigationState.routes[i];
                    const focused = i === navigationState.index;

                    return (
                        <View
                            key={route.key}
                            pointerEvents="box-none"
                            testID={this.props.getTestID({ route })}
                            accessibilityElementsHidden={!focused}
                            importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
                            style={
                                layout.width
                                    ? { width: layout.width, overflow: 'hidden' }
                                    : focused ? styles.page : null
                            }
                        >
                            {focused || layout.width ? child : null}
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        overflow: 'hidden',
    },
});
