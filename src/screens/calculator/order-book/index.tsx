import React from 'react';
import numeral from 'numeral';
import { RouteComponentProps } from 'react-router-native';
import { View } from 'react-native';
import { getAsset, KunaMarket } from 'kuna-sdk';
import OrderBookProcessor from 'utils/order-book-processor';
import SpanText from 'components/span-text';
import RouterLink from 'components/router-link';
import CalculatorPair, { Side } from '../calculator-pair';
import styles from './order-book.style';
import { CalculatorMode, OperationMode } from '../common';
import { compose } from 'recompose';
import { withRouter } from 'react-router';


type OrderBookCalcFullProps = RouteComponentProps<{ operation: OperationMode }> & OrderBookCalcProps;
type OrderBookCalcProps = {
    market: KunaMarket;
    usdPrice?: number;
    orderBook: OrderBookProcessor;
};

type OrderBookCalcState = {
    values: [number, number];
    orderCounter: number;
};

class OrderBookCalc extends React.PureComponent<OrderBookCalcFullProps, OrderBookCalcState> {
    public state: OrderBookCalcState = {
        values: [0, 0],
        orderCounter: 0,
    };

    public render(): JSX.Element {
        const { market, match } = this.props;
        const { values, orderCounter } = this.state;

        const mode = match.params.operation;

        const baseAsset = getAsset(market.baseAsset);
        const quoteAsset = getAsset(market.quoteAsset);

        return (
            <>
                <View style={styles.modeButtonsBox}>
                    <RouterLink
                        to={`/${CalculatorMode.OrderBook}/${OperationMode.Buy}`}
                        style={[
                            styles.modeButton,
                            styles.modeButtonBuy,
                            mode === OperationMode.Buy ? styles.modeButtonActive : undefined,
                        ]}
                    >Buy {baseAsset.key}</RouterLink>

                    <RouterLink
                        to={`/${CalculatorMode.OrderBook}/${OperationMode.Sell}`}
                        style={[
                            styles.modeButton,
                            styles.modeButtonSell,
                            mode === OperationMode.Sell ? styles.modeButtonActive : undefined,
                        ]}
                    >Sell {baseAsset.key}</RouterLink>
                </View>

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
        const { orderBook, match } = this.props;

        if (!value || value <= 0) {
            this.setState({ values: [0, 0], orderCounter: 0 });

            return 0;
        }

        const mode = match.params.operation;

        const book = mode === OperationMode.Buy
            ? orderBook.getAsk(100)
            : orderBook.getBid(100);

        switch (side) {
            case Side.Quote: {
                const { values, orderCounter } = orderBook.calculateAmountQuote(value, book);
                this.setState({
                    values: values,
                    orderCounter: orderCounter,
                });

                return values[0];
            }


            case Side.Base: {
                const { values, orderCounter } = orderBook.calculateAmountBase(value, book);
                this.setState({
                    values: values,
                    orderCounter: orderCounter,
                });

                return values[1];
            }
        }
    };
}

export default compose<OrderBookCalcFullProps, OrderBookCalcProps>(withRouter)(OrderBookCalc);
