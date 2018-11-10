import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Color } from 'styles/variables';

export type ShadeHeaderProps = {
    opacity?: any;
};

export const ShadeHeader = (props: ShadeHeaderProps) => (
    <Animated.View style={[styles.header, { opacity: props.opacity || 1 }]}>
        <View style={styles.headerBrow} />
    </Animated.View>
);

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    headerBrow: {
        backgroundColor: Color.Gray,
        height: 4,
        width: 50,
        borderRadius: 4,
    },
});
