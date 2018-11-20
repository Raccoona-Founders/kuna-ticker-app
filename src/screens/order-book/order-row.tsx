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
    ] = chooseStyles(props.type);

    return (
        <View style={[styles.container, containerStyle]}>
            <SpanText style={[styles.price, priceStyle]}>
                {Numeral(props.price).format(props.market.format)}
            </SpanText>
            <SpanText style={[styles.value]}>
                {Numeral(props.value).format('0,0.[0000]')}
            </SpanText>
        </View>
    );
};


function chooseStyles(type: 'ask' | 'bid'): StyleProp<any>[] {
    switch (type) {
        case 'ask':
            return [
                styles.containerAsk,
                styles.priceAsk,
            ];

        case 'bid':
            return [
                styles.containerBid,
                styles.priceBid,
            ];
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 25,
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
});


export default OrderRow;
