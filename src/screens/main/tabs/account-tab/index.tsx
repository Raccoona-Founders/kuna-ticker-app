import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';


export default (): JSX.Element => {

    return (
        <View style={styles.container}>
            <SpanText>Not available</SpanText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


