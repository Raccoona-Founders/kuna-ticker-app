import React from 'react';
import numeral from 'numeral';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SpanText } from 'components/span-text';
import { Color } from 'styles/variables';

type PriceChangeBoxProps = {
    value: number;
    style?: StyleProp<ViewStyle>;
};

const PriceChangeBox = (props: PriceChangeBoxProps) => {
    const priceChangeBoxStyle = [
        styles.priceChangeBox,
        props.value > 0 ? styles.priceChangeBoxUp : styles.priceChangeBoxDown,
    ];

    const priceChangeStyles = [
        styles.priceChange,
        props.value > 0 ? styles.priceChangeUp : styles.priceChangeDown,
    ];

    return (
        <View style={[priceChangeBoxStyle, props.style]}>
            <SpanText style={priceChangeStyles}>{numeral(props.value).format('+0,0.00')}%</SpanText>
        </View>
    );

};

export default PriceChangeBox;

export const styles = StyleSheet.create({
    priceChangeBox: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        height: 30,
    },
    priceChangeBoxUp: {
        backgroundColor: '#00BA4F33',
    },
    priceChangeBoxDown: {
        backgroundColor: '#FD2A4733',
    },

    priceChange: {
        fontSize: 14,
    },
    priceChangeUp: {
        color: Color.Success,
    },
    priceChangeDown: {
        color: Color.Danger,
    },
});
