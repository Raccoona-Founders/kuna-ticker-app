import React from 'react';
import { Animated } from 'react-native';
import { CONSTANTS } from '../helper';
import { headerStyles } from './shade.style';

export type ShadeHeaderProps = {
    opacity?: any;
    position: Animated.Value;
};

export default (props: ShadeHeaderProps) => {

    const scaleAnimation = props.position.interpolate({
        inputRange: [CONSTANTS.SCROLL_TO_CLOSE, 0],
        outputRange: [0.1, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[headerStyles.header, { opacity: props.opacity || 1 }]}>
            <Animated.View
                style={[headerStyles.headerBrow, { transform: [{ scaleX: scaleAnimation }] }]}
            />
        </Animated.View>
    );
};
