import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SpanText } from 'components/span-text';

type InfoUnitProps = {
    topic: string;
    value: string;
    valueColor?: string;
    style?: StyleProp<ViewStyle>;
};

const InfoUnit = (props: InfoUnitProps) => {
    const { valueColor = undefined } = props;

    return (
        <View style={[styles.container, props.style]}>
            <SpanText style={[styles.value, valueColor ? { color: valueColor } : {}]}>
                {props.value}
            </SpanText>
            <SpanText style={styles.topic}>{props.topic}</SpanText>
        </View>
    );
};

export default InfoUnit;

const styles = StyleSheet.create({
    container: {
        width: '50%',
        marginBottom: 10,
    },
    topic: {
        fontSize: 10,
        marginBottom: 5,
        opacity: 0.8,
        textTransform: 'uppercase',
    },
    value: {
        fontSize: 18,
        fontWeight: '500',
    },
});
