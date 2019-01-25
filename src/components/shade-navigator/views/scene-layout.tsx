import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { layoutStyles } from './shade.style';

const EPS = 1e-5;
const screenHeight = Dimensions.get('window').height;

type SceneLayoutProps = {
    position: Animated.Value;
    index: number;
};

export default class SceneLayout extends React.PureComponent<SceneLayoutProps> {
    protected _translateY?: Animated.AnimatedInterpolation;
    protected _contentScale?: Animated.AnimatedInterpolation;
    protected _overlayOpacity?: Animated.AnimatedInterpolation;

    public constructor(props: SceneLayoutProps) {
        super(props);

        const { index, position } = this.props;
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
    }

    public render(): JSX.Element {
        const style = {
            transform: [{
                translateY: this._translateY || screenHeight,
            }, {
                scale: this._contentScale || 1,
            }],
        };

        const overlayStyle = {
            opacity: this._overlayOpacity || 0,
        };

        return (
            <Animated.View style={[StyleSheet.absoluteFillObject]}>
                <Animated.View style={[layoutStyles.main, style]}>{this.props.children}</Animated.View>
                <Animated.View style={[layoutStyles.overlay, overlayStyle]} pointerEvents="box-none" />
            </Animated.View>
        );
    }
}
