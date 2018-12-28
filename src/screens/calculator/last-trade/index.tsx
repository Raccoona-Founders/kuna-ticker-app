import React from 'react';
import numeral from 'numeral';
import { View, Text } from 'react-native';
import { getAsset, KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import styles from './last-trade.style';

import CalculatorPair, { Side } from '../calculator-pair';
import SpanText from 'components/span-text';

type LastTradeCalcProps = {
    market: KunaMarket;
    ticker: KunaV3Ticker;
    usdPrice?: number;
};

type LastTradeCalcState = {
    buyValue: number;
};

export default class LastTradeCalc extends React.PureComponent<LastTradeCalcProps, LastTradeCalcState> {
    public state: LastTradeCalcState = {
        buyValue: 0,
    };


    public render(): JSX.Element {
        const { market, ticker } = this.props;

        if (!ticker.lastPrice) {
            return <View />;
        }

        return (
            <>
                <CalculatorPair market={market} processCalculating={this.__onCalculate} />

                {this.__renderUseEquivalent()}
            </>
        );
    }


    protected __onCalculate = (value: number, type: Side): number => {
        const { ticker } = this.props;

        if (!value || value <= 0) {
            return 0;
        }

        switch (type) {
            case Side.Quote:
                const buyValue = numeral(value).divide(ticker.lastPrice || 0).value();
                this.setState({ buyValue: buyValue });

                return buyValue;

            case Side.Base:
                this.setState({ buyValue: value });

                return numeral(value).multiply(ticker.lastPrice || 0).value();
        }
    };
            

    private __renderUseEquivalent(): JSX.Element {
        const { buyValue = 0 } = this.state;
        const { usdPrice, market } = this.props;

        const buyAsset = getAsset(market.baseAsset);

        if (!usdPrice || usdPrice <= 0) {
            return <View />;
        }

        const buyNumber = numeral(buyValue || 0);

        return (
            <View style={styles.resultContainer}>
                <SpanText style={styles.resultUsdValue}>
                    <Text style={{ fontWeight: '400' }}>
                        {buyNumber.format(buyAsset.format) || '0'} {buyAsset.key}
                    </Text>
                    <Text> ~ </Text>
                    <Text>${buyNumber.multiply(usdPrice).format('0,0.00')}</Text>
                </SpanText>
            </View>
        );
    }
}
