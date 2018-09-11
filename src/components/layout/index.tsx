import React from 'react';
import { SafeAreaView, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';

export type LayoutProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export const Layout = (props: LayoutProps) => {

    const {style, children} = props;

    return (
        <SafeAreaView style={[styles.safeAreaView, style]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        // backgroundColor: Color.Background,
    },
    safeArea: {
        flex: 1,
    },
});
