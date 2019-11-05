import React from 'react';
import numeral from 'numeral';
import { getAsset, KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import { View, StyleSheet } from 'react-native';
import { _ } from 'utils/i18n';
import SpanText from 'components/span-text';
import { Color, DefaultStyles } from 'styles/variables';
import { OperationMode } from '../../common';
import TradeValuesRow from './trade-values-row';


type ProcessResultProps = {
    mode: OperationMode;
    market: KunaMarket;
    ticker: KunaV3Ticker;
    baseValue: number;
    quoteValue: number;
};


export default class ProcessResultSection extends React.PureComponent<ProcessResultProps> {
    public render(): JSX.Element {
        const {market, ticker, baseValue, quoteValue, mode} = this.props;

        const avrPrice = numeral(quoteValue).divide(baseValue);

        const diffPrice = numeral(avrPrice).subtract(ticker.lastPrice);
        return (
            <View>
                <TradeValuesRow baseValue={baseValue}
                                quoteValue={quoteValue}
                                mode={mode}
                                baseAsset={getAsset(market.baseAsset)}
                                quoteAsset={getAsset(market.quoteAsset)}
                />

                <View style={styles.avgPrice}>
                    <SpanText style={styles.avgPriceLabel}>{_('calculator.average-price')}</SpanText>
                    <SpanText style={styles.avgPriceValue}>
                        {avrPrice.format(market.format)} {market.quoteAsset}
                    </SpanText>
                </View>

                <View style={styles.avgPriceDiff}>
                    <SpanText style={styles.avgPriceDiffText}>
                        {diffPrice.format('+' + market.format)} {market.quoteAsset}
                    </SpanText>
                    <View style={styles.avgPriceDiffSeparator}/>
                    <SpanText style={styles.avgPriceDiffText}>
                        {diffPrice.divide(ticker.lastPrice).format('+0,0.0[0]%')}
                    </SpanText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    operationBox: {
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    operationBoxSell: {},
    operationBoxBuy: {
        flexDirection: 'row-reverse',
    },
    operationValue: {
        fontSize: 16,
        width: '40%',
    },


    avgPrice: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    avgPriceLabel: {
        width: '100%',
        textTransform: 'uppercase',
        fontSize: 14,
        color: Color.SecondaryText,
    },
    avgPriceValue: {
        ...DefaultStyles.boldFont,
        fontSize: 20,
        marginBottom: 5,
        marginTop: 5,
    },
    avgPriceAsset: {
        fontSize: 20,
        marginLeft: 5,
        color: Color.SecondaryText,
    },

    avgPriceDiff: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avgPriceDiffText: {
        fontSize: 14,
    },
    avgPriceDiffSeparator: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Color.SecondaryText,
        height: 3,
        width: 3,
        borderRadius: 3,
    },
});
