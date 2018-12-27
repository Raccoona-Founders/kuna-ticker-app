import React from 'react';
import numeral from 'numeral';
import { View } from 'react-native';
import { getAsset, KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import SpanText from 'components/span-text';
import CalculatorPair, { Operation } from '../calculator-pair';
import styles from './order-book.style';

type OrderBookCalcProps = {
    market: KunaMarket;
    ticker: KunaV3Ticker;
    usdPrice?: number;
};

type OrderBookCalcState = {
    value: number;
};

export default class OrderBookCalc extends React.PureComponent<OrderBookCalcProps, OrderBookCalcState> {
    public state: OrderBookCalcState = {
        value: 0,
    };


    public render(): JSX.Element {
        const { market, ticker } = this.props;

        if (!ticker.lastPrice) {
            return <View />;
        }

        return (
            <>
                <CalculatorPair market={market} processCalculating={this.__onCalculate} />
            </>
        );
    }


    protected __onCalculate = (value: number, type: Operation): number => {
        const { ticker } = this.props;

        if (!value || value <= 0) {
            return 0;
        }

        switch (type) {
            case Operation.Sell:
                const buyValue = numeral(value).divide(ticker.lastPrice || 0).value();
                this.setState({ value: buyValue });

                return buyValue;

            case Operation.Buy:
                this.setState({ value: value });

                return numeral(value).multiply(ticker.lastPrice || 0).value();
        }
    };
}
