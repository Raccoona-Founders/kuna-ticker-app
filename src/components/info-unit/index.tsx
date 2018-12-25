import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SpanText } from 'components/span-text';
import { Color } from 'styles/variables';

type InfoUnitProps = {
    topic: string;
    value: string | JSX.Element | React.ReactNode;
    valueColor?: string;
    style?: StyleProp<ViewStyle>;
    valueStyle?: StyleProp<ViewStyle>;
};

const InfoUnit = (props: InfoUnitProps) => {
    const { valueColor = undefined } = props;

    return (
        <View style={[styles.container, props.style]}>
            {typeof props.value === 'string' ? (
                <SpanText style={[styles.valueText, valueColor ? { color: valueColor } : {}]}>
                    {props.value}
                </SpanText>
            ) : (
                <View style={[styles.valueBox, props.valueStyle]}>{props.value}</View>
            )}

            <SpanText style={styles.topic}>{props.topic}</SpanText>
        </View>
    );
};

export default InfoUnit;

const styles = StyleSheet.create({
    container: {

    },
    topic: {
        fontSize: 10,
        marginBottom: 5,
        color: Color.GrayBlues,
        textTransform: 'uppercase',
    },
    valueText: {
        fontSize: 18,
        fontWeight: '500',
    },
    valueBox: {
        flexDirection: 'row'
    }
});
