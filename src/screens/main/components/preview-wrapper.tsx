import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

type PreviewWrapperProps = {};
type State = {
    ready: boolean;
};


export default class PreviewWrapper extends React.PureComponent<PreviewWrapperProps, State> {
    public state: State = {
        ready: false,
    };

    private value: Animated.Value = new Animated.Value(0);
    private readonly opacityAnimation: Animated.AnimatedInterpolation;

    public constructor(props: PreviewWrapperProps) {
        super(props);

        this.opacityAnimation = this.value.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0],
        });
    }

    public async componentDidMount() {
        setTimeout(() => {
            Animated.timing(this.value, {
                toValue: 100,
                duration: 350,
                useNativeDriver: true,
            }).start(this.__onEndAnimation);
        }, 300);
    }

    public render(): JSX.Element {
        const style = {
            opacity: this.opacityAnimation,
        };

        return (
            <>
                <Animated.View style={[styles.overlay, style, { zIndex: this.state.ready ? 0 : 5 }]} />

                {this.props.children}
            </>
        );
    }

    private __onEndAnimation = () => {
        this.setState({ ready: true });
    };
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Color.GrayWhite,
        zIndex: 5,
    },
});
