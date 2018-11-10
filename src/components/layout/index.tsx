import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Color } from 'styles/variables';

export type LayoutProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const Layout = (props: LayoutProps) => {

    const {style, children} = props;

    return children;
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Color.Gray,
    },
    safeArea: {
        flex: 1,
    },
});
