import React from 'react';
import BigNumber from 'bignumber.js';
import numeral from 'numeral';
import { View } from 'react-native';
import { getAsset, KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import OrderBookProcessor from 'utils/order-book-processor';
import SpanText from 'components/span-text';

import CalculatorPair, { Side } from '../calculator-pair';
import styles from './order-book.style';

type OrderBookCalcProps = {
    market: KunaMarket;
    usdPrice?: number;
    orderBook: OrderBookProcessor;
};

type OrderBookCalcState = {
    values: [number, number];
    orderCounter: number;
};

export default class OrderBookCalc extends React.PureComponent<OrderBookCalcProps, OrderBookCalcState> {
    public state: OrderBookCalcState = {
        values: [0, 0],
        orderCounter: 0,
    };


    public render(): JSX.Element {
        const { market } = this.props;
        const { values, orderCounter } = this.state;

        const baseAsset = getAsset(market.baseAsset);
        const quoteAsset = getAsset(market.quoteAsset);

        return (
            <>
                <CalculatorPair market={market} processCalculating={this.__onCalculate} />

                <SpanText>
                    {numeral(values[1]).divide(values[0]).format(quoteAsset.format)} {market.quoteAsset} / {market.baseAsset}
                </SpanText>


                <SpanText>
                    <SpanText>{numeral(values[0]).format(baseAsset.format)} {market.baseAsset}</SpanText>
                    <SpanText>/</SpanText>
                    <SpanText>{numeral(values[1]).format(quoteAsset.format)} {market.quoteAsset}</SpanText>
                </SpanText>

                <SpanText>{orderCounter} orders</SpanText>
            </>
        );
    }


    protected __onCalculate = (value: number, side: Side): number => {
        const { orderBook } = this.props;

        if (!value || value <= 0) {
            this.setState({ values: [0, 0], orderCounter: 0 });

            return 0;
        }

        switch (side) {
            case Side.Quote: {
                const askBook = orderBook.getAsk(100);
                let orderCounter = 0;

                let baseValue = new BigNumber(0);
                let quoteValue = new BigNumber(0);
                let nValue = new BigNumber(value);

                for (let [p, v] of askBook) {
                    let orderSize = p * v;
                    if (nValue.minus(quoteValue).isLessThan(orderSize)) {
                        const leaveValue = nValue.minus(quoteValue);
                        baseValue = baseValue.plus(leaveValue.div(p));
                        quoteValue = quoteValue.plus(leaveValue);
                    } else {
                        baseValue = baseValue.plus(v);
                        quoteValue = quoteValue.plus(orderSize);
                    }

                    orderCounter++;

                    if (quoteValue.isGreaterThanOrEqualTo(value)) {
                        break;
                    }
                }

                this.setState({
                    values: [baseValue.toNumber(), quoteValue.toNumber()],
                    orderCounter: orderCounter,
                });

                return baseValue.toNumber();
            }


            case Side.Base: {
                const askBook = orderBook.getAsk(100);
                let orderCounter = 0;

                let baseValue = new BigNumber(0);
                let quoteValue = new BigNumber(0);
                let nValue = new BigNumber(value);

                for (let [p, v] of askBook) {
                    let orderSize = p * v;
                    if (nValue.minus(baseValue).isLessThan(v)) {
                        const leaveValue = nValue.minus(baseValue);
                        baseValue = baseValue.plus(leaveValue);
                        quoteValue = quoteValue.plus(leaveValue.times(p));
                    } else {
                        baseValue = baseValue.plus(v);
                        quoteValue = quoteValue.plus(orderSize);
                    }

                    orderCounter++;

                    if (baseValue.isGreaterThanOrEqualTo(value)) {
                        break;
                    }
                }

                this.setState({
                    values: [baseValue.toNumber(), quoteValue.toNumber()],
                    orderCounter: orderCounter,
                });

                return quoteValue.toNumber();
            }
        }
    };
}
