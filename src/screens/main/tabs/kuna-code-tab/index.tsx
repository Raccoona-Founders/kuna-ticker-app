import React from 'react';
import { StyleSheet, View } from 'react-native';
import SpanText from 'components/span-text';


export default class KunaCodeTab extends React.Component {
    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <SpanText>Not available</SpanText>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
