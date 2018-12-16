import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from 'styles/variables';
import { SpanText } from 'components/span-text';

type InfoUnitProps = {
    topic: string;
    value: string;
    valueColor?: string;
};

export default (props: InfoUnitProps) => {
    const { valueColor = undefined } = props;

    return (
        <View style={styles.container}>
            <SpanText style={styles.topic}>{props.topic}</SpanText>
            <SpanText style={[styles.value, valueColor ? { color: valueColor } : {}]}>
                {props.value}
            </SpanText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        marginBottom: 20,
    },
    topic: {
        color: Color.Gray2,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },
    value: {
        fontSize: 18,
        fontWeight: '500',
    },
});
