import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Color } from 'styles/variables';

export const MainHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.titleArea}><Text style={styles.titleText}>Kuna Markets</Text></View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 30,
        backgroundColor: Color.Primary,
    },
    titleArea: {
        flex: 1,
    },
    titleText: {
        textAlign: 'center',
        color: Color.White,
    },
});