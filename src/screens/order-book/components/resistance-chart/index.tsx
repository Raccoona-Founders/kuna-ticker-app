import React from 'react';
import { StyleSheet, View } from 'react-native';
import Numeral from 'numeral';
import { KunaMarket } from 'kuna-sdk';
import { _ } from 'utils/i18n';
import OrderBookProcessor from 'utils/order-book-processor';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';

type ResistanceChartProps = {
    market: KunaMarket;
    orderBook: OrderBookProcessor;
};

export default class ResistanceChart extends React.PureComponent<ResistanceChartProps> {
    public render(): JSX.Element {
        const { market, orderBook } = this.props;

        const sell = orderBook.calculatePriceDepth('ask', 0.1);
        const buy = orderBook.calculatePriceDepth('bid', 0.1);
        const percent = buy[0] / (buy[0] + sell[0]) || 0;

        return (
            <View style={styles.box}>
                <SpanText style={styles.title}>
                    {_('order-book.resistance.title')}
                </SpanText>
                <View style={styles.chart}>
                    <View style={[styles.indicator, styles.indicatorAsk, { width: `${percent * 100}%` }]} />
                    <View style={[styles.indicator, styles.indicatorBid, { width: `${(1 - percent) * 100}%` }]} />
                </View>

                <View style={styles.rangeContainer}>
                    <SpanText style={[styles.rangeValue, styles.rangeValueBuy]}>
                        {_('general.ask')}: {Numeral(buy[0]).format('0,0.[00]')} {market.baseAsset}
                    </SpanText>

                    <SpanText style={[styles.rangeValue, styles.rangeValueSell]}>
                        {_('general.bid')}: {Numeral(sell[0]).format('0,0.[00]')} {market.baseAsset}
                    </SpanText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    box: {
        marginBottom: 20,
    },
    rangeContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    rangeValue: {
        fontSize: 14,
    },
    rangeValueBuy: {
        color: Color.Main,
    },
    rangeValueSell: {
        color: Color.Danger,
    },

    chart: {
        flexDirection: 'row',
        height: 5,
        width: '100%',
        borderRadius: 5,
        backgroundColor: Color.GrayLight,
        overflow: 'hidden',
    },

    indicator: {
        height: 5,
    },
    indicatorAsk: {
        backgroundColor: Color.Main,
    },
    indicatorBid: {
        backgroundColor: Color.Danger,
    },
});
