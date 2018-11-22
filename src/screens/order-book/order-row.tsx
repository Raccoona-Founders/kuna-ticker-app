import React from 'react';
import Numeral from 'numeral';
import { View, StyleSheet, StyleProp } from 'react-native';
import SpanText from 'components/span-text';
import { KunaMarket } from 'kuna-sdk';
import { Color } from 'styles/variables';

type OrderRowProps = {
    price: number;
    value: number;
    type: 'ask' | 'bid';
    maxValue: number;
    avrValue: number;
    market: KunaMarket;
};

const OrderRow = (props: OrderRowProps) => {

    const [
        containerStyle,
        priceStyle,
        valueIndicatorStyle,
    ] = chooseStyles(props.type);

    let valueFormat = props.avrValue > 10 ? '0,0' : (props.avrValue > 5 ? '0,0.[00]' : '0,0.[0000]');
    const valuePercent = Numeral(props.value).divide(props.maxValue);

    const valueStyles = [
        styles.value,
        {
            opacity: 0.7 + valuePercent.value() * 0.3,
        },
    ];

    return (
        <View style={styles.orderRow}>
            <View style={[styles.container, containerStyle]}>
                <SpanText style={[styles.price, priceStyle]}>
                    {Numeral(props.price).format(props.market.format)}
                </SpanText>
                <SpanText style={valueStyles}>
                    {Numeral(props.value).format(valueFormat)}
                </SpanText>
            </View>

            <View style={[
                styles.valueIndicator,
                valueIndicatorStyle,
                { width: valuePercent.format('0,0.[00]%') },
            ]} />
        </View>
    );
};


function chooseStyles(type: 'ask' | 'bid'): StyleProp<any>[] {
    switch (type) {
        case 'ask':
            return [
                styles.containerAsk,
                styles.priceAsk,
                styles.valueIndicatorAsk,
            ];

        case 'bid':
            return [
                styles.containerBid,
                styles.priceBid,
                styles.valueIndicatorBid,
            ];
    }
}


const styles = StyleSheet.create({
    orderRow: {
        height: 25,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },

    containerBid: {
        flexDirection: 'row-reverse',
    },

    containerAsk: {},

    price: {
        fontSize: 14,
    },
    priceAsk: {
        color: Color.Danger,
    },
    priceBid: {
        color: Color.Main,
    },

    value: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.DarkPurple,
    },

    valueHigh: {
        fontWeight: '700',
    },

    valueMiddle: {
        fontWeight: '600',
    },

    valueIndicator: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        opacity: 0.5,
        height: 3,
        borderRadius: 1,
    },

    valueIndicatorAsk: {
        left: 0,
        backgroundColor: Color.Danger,
    },

    valueIndicatorBid: {
        right: 0,
        backgroundColor: Color.Main,
    },
});


export default OrderRow;
