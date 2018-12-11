import React from 'react';
import {
    Animated,
    Easing,
    View,
    ScrollViewProps,
    NativeSyntheticEvent,
    NativeScrollEvent, StyleProp, ViewStyle, LayoutChangeEvent,
} from 'react-native';
import { NavigationActions, NavigationTransitionProps } from 'react-navigation';
import { clamp } from '../helper';
import ShadeHeader from './shade-header';
import { SceneTransitionConsumer, SceneTransitionContext } from './scene-transition-context';
import { cardStyles } from './shade.style';

const EaseInOut = Easing.inOut(Easing.ease);
const ANIMATION_DURATION = 400;

class ShadeScrollCard extends React.PureComponent<ShadeCardProps, any> {
    public state = {
        scrollEnabled: true,
        footerHeight: 0,
    };

    protected _headerOpacity: Animated.AnimatedInterpolation;
    protected _shadeInnerContentOffset: Animated.AnimatedInterpolation;

    protected _scrollViewYOffset: Animated.Value = new Animated.Value(0);
    protected _scrollEventListenerID: string;

    protected _onScrollViewScroll: (...vars: any[]) => void;

    public constructor(props: ShadeCardProps) {
        super(props);

        this._onScrollViewScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._scrollViewYOffset } } }],
            { useNativeDriver: true },
        );

        this._shadeInnerContentOffset = this._scrollViewYOffset.interpolate({
            inputRange: [-100, 0, 100],
            outputRange: [-100, 0, 0],
            extrapolateRight: "clamp",
        });

        this._headerOpacity = this._scrollViewYOffset.interpolate({
            inputRange: [0, 30],
            outputRange: [1, 0],
        });

        this._scrollEventListenerID = this._scrollViewYOffset.addListener(this.__onDragScrollTop);
    }

    public render(): JSX.Element {
        const scrollViewStyles = [cardStyles.scrollView, {
            transform: [{
                translateY: this._shadeInnerContentOffset,
            }],
        }];

        return (
            <Animated.View style={cardStyles.shadeView}>
                <ShadeHeader opacity={this._headerOpacity} />

                <Animated.ScrollView {...this.__scrollViewProps} style={scrollViewStyles}>
                    <View style={[cardStyles.innerContent, this.props.style]}>{this.props.children}</View>
                    <View style={{ height: this.state.footerHeight }}/>
                </Animated.ScrollView>

                <View style={cardStyles.footer} onLayout={this.__handleFooterLayout}>
                    {this.__renderFooter()}
                </View>
            </Animated.View>
        );
    }

    protected __renderFooter = (): JSX.Element => {
        const { renderFooter } = this.props;

        return renderFooter ? renderFooter() : <View />;
    };


    protected __handleFooterLayout = (event: LayoutChangeEvent) => {
        this.setState({
            footerHeight: event.nativeEvent.layout.height,
        });
    };


    protected get __scrollViewProps(): ScrollViewProps {
        return {
            contentContainerStyle: {
                minHeight: '100%',
            },
            keyboardShouldPersistTaps: 'handled',
            showsVerticalScrollIndicator: false,
            scrollEventThrottle: 1,
            scrollEnabled: this.state.scrollEnabled,
            onScroll: this._onScrollViewScroll,
            onScrollEndDrag: this.__onScrollEndDrag,
        };
    }

    protected __onDragScrollTop = (state: { value: number }): void => {
        if (state.value > 0) {
            return;
        }

        const { layout, navigation, position } = this.props;
        const { index } = navigation.state;

        const currentValue = index + state.value / (layout.height.__getValue() - 40);
        const value = clamp(index - 1, currentValue, index);

        position.setValue(value);
    };


    protected __onScrollEndDrag = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { navigation, position, layout } = this.props;
        const { index } = navigation.state;
        const axisDistance = layout.height.__getValue();

        const scrollV = nativeEvent.velocity;
        const velocityY = scrollV ? scrollV.y : 0;

        const movedDistance = nativeEvent.contentOffset.y;
        const gestureVelocity = -velocityY;

        if (movedDistance >= 0) {
            return;
        }

        const defaultVelocity = axisDistance / ANIMATION_DURATION;
        const velocity = Math.max(Math.abs(gestureVelocity), defaultVelocity);
        const goBackDuration = (axisDistance - movedDistance) / velocity;

        position.stopAnimation(() => {
            if (gestureVelocity > 2) {
                this._goBack(index, goBackDuration);
                return;
            }
        });
    };


    protected _goBack = (backFromIndex: number, duration: number = ANIMATION_DURATION) => {
        const { navigation, position, scenes } = this.props;

        this._scrollViewYOffset.removeListener(this._scrollEventListenerID);

        const toValue = Math.max(backFromIndex - 1, 0);

        const onCompleteAnimation = (result: Animated.EndResult) => {
            if (false === result.finished) {
                return;
            }

            const backFromScene = scenes.find(s => s.index === toValue + 1);
            if (backFromScene) {
                navigation.dispatch(NavigationActions.back({
                    key: backFromScene.route.key,
                    immediate: true,
                } as any));
            }
        };

        Animated.timing(position, {
            toValue: toValue,
            duration: duration,
            easing: EaseInOut,
            useNativeDriver: position.__isNative || false,
        }).start(onCompleteAnimation);
    };
}


type ShadeCardOuterProps = {
    children?: any;
    style?: StyleProp<ViewStyle>;

    renderFooter?: () => JSX.Element;
};
type ShadeCardProps = NavigationTransitionProps & ShadeCardOuterProps;

export default (props: ShadeCardOuterProps) => {
    return (
        <SceneTransitionConsumer>
            {(context: SceneTransitionContext | undefined) => (
                context && <ShadeScrollCard {...context} {...props} />
            )}
        </SceneTransitionConsumer>
    );
}
