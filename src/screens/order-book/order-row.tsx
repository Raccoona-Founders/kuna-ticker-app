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
    market: KunaMarket;
};

const OrderRow = (props: OrderRowProps) => {

    const [
        containerStyle,
        priceStyle,
        valueIndicatorStyle,
    ] = chooseStyles(props.type);

    const valuePercent = Numeral(props.value).divide(props.maxValue);

    return (
        <View style={styles.orderRow}>
            <View style={[styles.container, containerStyle]}>
                <SpanText style={[styles.price, priceStyle]}>
                    {Numeral(props.price).format(props.market.format)}
                </SpanText>
                <SpanText style={[styles.value, valuePercent.value() > 0.5 ? styles.valueWall : {}]}>
                    {Numeral(props.value).format('0,0.[0000]')}
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
        fontWeight: 'normal',
        color: Color.DarkPurple,
    },

    valueWall: {
        fontWeight: 'bold',
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
