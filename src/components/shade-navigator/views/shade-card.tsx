import React from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    View,
    ScrollViewProps,
} from 'react-native';
import { NavigationActions, NavigationTransitionProps } from 'react-navigation';


import {
    NativeViewGestureHandler,
    NativeViewGestureHandlerProperties, NativeViewGestureHandlerStateChangeEvent,
    PanGestureHandler,
    PanGestureHandlerProperties,
    State,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';


import { Color } from 'styles/variables';
import { ShadeHeader } from 'components/shade-header';


const EaseInOut = Easing.inOut(Easing.ease);
const ANIMATION_DURATION = 400;

function clamp(min: number, value: number, max: number) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

const EPS = 1e-5;
const screenHeight = Dimensions.get('window').height;


type ShadeCardProps = NavigationTransitionProps & {
    isShade: boolean;
};


export class ShadeCard extends React.PureComponent<ShadeCardProps, any> {

    public state = {
        disableGesture: false,
        bounces: false,
    };

    protected _translateY: Animated.AnimatedInterpolation;
    protected _contentScale: Animated.AnimatedInterpolation;
    protected _overlayOpacity: Animated.AnimatedInterpolation;

    protected _reverseLastScrollY: Animated.AnimatedMultiplication;

    protected _headerOpacity: Animated.AnimatedInterpolation;

    protected _lastScrollYValue: number = 0;
    protected _lastScrollY: Animated.Value = new Animated.Value(0);
    protected _dragY: Animated.Value = new Animated.Value(0);
    protected _scrollViewYOffset: Animated.Value = new Animated.Value(0);

    protected _onGestureEvent: (...vars: any[]) => void;
    protected _onRegisterLastScroll: (...vars: any[]) => void;
    protected _onScrollViewScroll: (...vars: any[]) => void;

    protected masterDrawer = React.createRef<TapGestureHandler>();
    protected nativeViewRef = React.createRef<NativeViewGestureHandler>();

    public constructor(props: ShadeCardProps) {
        super(props);

        const { index } = this.props.scene;
        const position: Animated.Value = this.props.position;

        const inputRange = [index - 1, index, index + 1 - EPS, index + 2];

        this._translateY = position.interpolate({
            inputRange: inputRange,
            outputRange: [screenHeight, 0, -24, 0],
            extrapolate: 'clamp',
        });

        this._contentScale = position.interpolate({
            inputRange: inputRange,
            outputRange: [1, 1, 0.95, 0.95],
            extrapolate: 'clamp',
        });

        this._overlayOpacity = position.interpolate({
            inputRange: inputRange,
            outputRange: [0, 0, 0.3, 0],
            extrapolate: 'clamp',
        });

        this._onGestureEvent = Animated.event(
            [{ nativeEvent: { translationY: this._dragY } }],
            { useNativeDriver: true },
        );

        this._onRegisterLastScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._lastScrollY } } }],
            { useNativeDriver: true },
        );

        this._onScrollViewScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._scrollViewYOffset } } }],
            { useNativeDriver: true },
        );

        this._lastScrollY.addListener(({ value }: any) => {
            this._lastScrollYValue = value > 0 ? value : 0;
        });

        this._reverseLastScrollY = Animated.multiply(
            new Animated.Value(-1),
            this._lastScrollY,
        );

        this._headerOpacity = this._scrollViewYOffset.interpolate({
            inputRange: [0, 30],
            outputRange: [1, 0],
        });

        this._dragY.addListener(this._onDragGesture);
        this._scrollViewYOffset.addListener((state: { value: number }) => {
            this.setState({ bounces: state.value > 0 });
        });
    }

    public render(): JSX.Element {
        const { isShade } = this.props;

        const style = {
            transform: [{
                translateY: this._translateY,
            }, {
                scale: this._contentScale,
            }],
        };

        const overlayStyle = {
            opacity: this._overlayOpacity,
        };

        return (
            <Animated.View style={[StyleSheet.absoluteFillObject]}>
                <Animated.View style={[styles.main, style]}>
                    {isShade ? this._renderShade() : this.props.children}
                </Animated.View>

                <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="box-none" />
            </Animated.View>
        );
    }

    protected _renderShade = () => {

        return (
            <PanGestureHandler {...this._gestureMasterProps}>
                <Animated.View style={styles.shadeView}>
                    <ShadeHeader opacity={this._headerOpacity} />

                    <NativeViewGestureHandler {...this._gestureNativeProps}>
                        <Animated.ScrollView {...this._scrollViewProps}>
                            <View style={styles.innerContent}>{this.props.children}</View>
                        </Animated.ScrollView>
                    </NativeViewGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        );
    };


    protected get _gestureMasterProps(): PanGestureHandlerProperties & any {
        return {
            ref: this.masterDrawer,
            simultaneousHandlers: this.nativeViewRef as any,

            enabled: this.props.index > 0 && !this.state.disableGesture,
            shouldCancelWhenOutside: false,
            onGestureEvent: this._onGestureEvent,
            onHandlerStateChange: this._onHandlerStateChange,
        };
    }


    protected get _gestureNativeProps(): NativeViewGestureHandlerProperties & any {
        return {
            ref: this.nativeViewRef,
            simultaneousHandlers: this.masterDrawer,
            enabled: false,
        };
    }

    protected get _scrollViewProps(): ScrollViewProps {
        return {
            style: styles.scrollView,
            contentContainerStyle: {
                minHeight: '100%',
            },
            keyboardShouldPersistTaps: 'handled',
            bounces: this.state.bounces,
            showsVerticalScrollIndicator: false,
            scrollEventThrottle: 1,

            onScroll: this._onScrollViewScroll,
            onScrollBeginDrag: this._onRegisterLastScroll,
        };
    }


    protected _onDragGesture = (state: { value: number }): void => {
        const { layout, navigation, position } = this.props;
        const { index } = navigation.state;

        const currentValue = index - (state.value - this._lastScrollYValue) / (layout.height.__getValue() - 40);
        const value = clamp(index - 1, currentValue, index);

        position.setValue(value);
    };


    protected _onHandlerStateChange = ({ nativeEvent }: TapGestureHandlerStateChangeEvent) => {
        switch (nativeEvent.oldState) {
            case State.ACTIVE: {
                const { navigation, position, layout } = this.props;
                const { index } = navigation.state;
                const axisDistance = layout.height.__getValue();

                let { velocityY, translationY } = nativeEvent as any;

                const movedDistance = translationY - this._lastScrollYValue;
                const gestureVelocity = velocityY / 1000;

                if (movedDistance < 0) {
                    return;
                }

                const defaultVelocity = axisDistance / ANIMATION_DURATION;
                const velocity = Math.max(Math.abs(gestureVelocity), defaultVelocity);

                const resetDuration = movedDistance / velocity;
                const goBackDuration = (axisDistance - movedDistance) / velocity;

                position.stopAnimation(() => {
                    if (gestureVelocity < -0.6) {
                        this._reset(index, resetDuration);
                        return;
                    }

                    if (gestureVelocity > 0.5) {
                        this._goBack(index, goBackDuration);
                        return;
                    }

                    this._reset(index, resetDuration);
                });
            }
        }
    };


    protected _reset = (resetToIndex: number, duration: number = ANIMATION_DURATION) => {
        Animated.timing(this.props.position, {
            toValue: resetToIndex,
            duration: duration,
            easing: EaseInOut,
            useNativeDriver: this.props.position.__isNative || false,
        }).start();
    };


    protected _goBack = (backFromIndex: number, duration: number = ANIMATION_DURATION) => {
        const { navigation, position, scenes } = this.props;

        this.setState({ disableGesture: true });

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

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    shadeView: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Color.White,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
    innerContent: {
        flex: 1,
        paddingTop: 30,
    },
});
