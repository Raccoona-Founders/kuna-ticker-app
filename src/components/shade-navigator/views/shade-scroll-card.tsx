import React from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    View,
    ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { NavigationActions, NavigationTransitionProps } from 'react-navigation';
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


export default class ShadeCard extends React.PureComponent<ShadeCardProps, any> {

    public state = {
        disableGesture: false,
        bounces: false,
    };

    protected _translateY: Animated.AnimatedInterpolation;
    protected _contentScale: Animated.AnimatedInterpolation;
    protected _overlayOpacity: Animated.AnimatedInterpolation;
    protected _headerOpacity: Animated.AnimatedInterpolation;

    protected _scrollViewYOffset: Animated.Value = new Animated.Value(0);

    protected _onScrollViewScroll: (...vars: any[]) => void;

    public constructor(props: ShadeCardProps) {
        super(props);

        const {index} = this.props.scene;
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


        this._onScrollViewScroll = Animated.event(
            [{nativeEvent: {contentOffset: {y: this._scrollViewYOffset}}}],
            {useNativeDriver: true},
        );

        this._headerOpacity = this._scrollViewYOffset.interpolate({
            inputRange: [0, 30],
            outputRange: [1, 0],
        });

        this._scrollViewYOffset.addListener(this.__onDragScrollTop);
    }

    public render(): JSX.Element {
        const {isShade} = this.props;

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

                <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="box-none"/>
            </Animated.View>
        );
    }

    protected _renderShade = () => {

        const scrollViewStyles = [styles.scrollView, {
            transform: [{
                translateY: this._scrollViewYOffset.interpolate({
                    inputRange: [-100, 0, 100],
                    outputRange: [-100, 0, 0],
                    extrapolateRight: "clamp",
                }),
            }],
        }];

        return (
            <Animated.View style={styles.shadeView}>
                <ShadeHeader opacity={this._headerOpacity}/>

                <Animated.ScrollView {...this._scrollViewProps} style={scrollViewStyles}>
                    <View style={styles.innerContent}>{this.props.children}</View>
                </Animated.ScrollView>
            </Animated.View>
        );
    };

    protected get _scrollViewProps(): ScrollViewProps {
        return {
            contentContainerStyle: {
                minHeight: '100%',
            },
            keyboardShouldPersistTaps: 'handled',
            bounces: true,
            showsVerticalScrollIndicator: false,
            scrollEventThrottle: 1,
            scrollEnabled: !this.state.disableGesture,
            onScroll: this._onScrollViewScroll,
            onScrollEndDrag: this.__onScrollEndDrag,
        };
    }

    protected __onDragScrollTop = (state: { value: number }): void => {
        const {layout, navigation, position} = this.props;
        const {index} = navigation.state;

        const currentValue = index - (-state.value) / (layout.height.__getValue() - 40);
        const value = clamp(index - 1, currentValue, index);

        position.setValue(value);
    };


    protected __onScrollEndDrag = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {navigation, position, layout} = this.props;
        const {index} = navigation.state;
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


    protected _reset = (resetToIndex: number, duration: number = ANIMATION_DURATION) => {
        Animated.timing(this.props.position, {
            toValue: resetToIndex,
            duration: duration,
            easing: EaseInOut,
            useNativeDriver: this.props.position.__isNative || false,
        }).start();
    };


    protected _goBack = (backFromIndex: number, duration: number = ANIMATION_DURATION) => {
        const {navigation, position, scenes} = this.props;

        this._scrollViewYOffset.removeAllListeners();

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

        console.log(toValue, duration);
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
        zIndex: 3,
    },
    innerContent: {
        flex: 1,
        paddingTop: 40,
    },
});
