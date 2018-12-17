import React from 'react';
import { Animated, View } from 'react-native';
import { headerStyles } from './shade.style';

export type ShadeHeaderProps = {
    opacity?: any;
};

const ShadeHeader = (props: ShadeHeaderProps) => (
    <Animated.View style={[headerStyles.header, { opacity: props.opacity || 1 }]}>
        <View style={headerStyles.headerBrow} />
    </Animated.View>
);

export default ShadeHeader;
