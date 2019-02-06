import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import numeral from 'numeral';
import { KunaMarket } from 'kuna-sdk';
import SpanText from 'components/span-text';
import { sideRowStyles } from './depth.style';

type OrderRowProps = {
    price: number;
    value: number;
    type: 'ask' | 'bid';
    totalValue: number;
    cumulativeValue: number;
    maxValue: number;
    avrValue: number;
    market: KunaMarket;
    styles?: Record<string, StyleProp<ViewStyle | TextStyle>>;
};

const OrderRow = (props: OrderRowProps) => {
    const { styles = {} } = props;

    let valueFormat = props.value > 10 ? '0,0' : (props.value > 5 ? '0,0.[00]' : '0,0.[000000]');
    const valuePercent = numeral(props.cumulativeValue).divide(props.totalValue);
    const valueAvgPercent = numeral(props.value).divide(props.maxValue);

    const valueStyles = [
        sideRowStyles.value,
        { opacity: 0.7 + valueAvgPercent.value() * 0.3 },
    ];

    return (
        <View style={sideRowStyles.orderRow}>
            <View style={[sideRowStyles.container, styles.container]}>
                <SpanText style={[sideRowStyles.price, styles.price]}>
                    {numeral(props.price).format(props.market.format)}
                </SpanText>
                <SpanText style={valueStyles}>
                    {numeral(props.value).format(valueFormat)}
                </SpanText>
            </View>

            <View style={[
                sideRowStyles.valueIndicator,
                styles.valueIndicator,
                { width: valuePercent.format('0,0.[00]%') },
            ]} />
        </View>
    );
};


export default OrderRow;
