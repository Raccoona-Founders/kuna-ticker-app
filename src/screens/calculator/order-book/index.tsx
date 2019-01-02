import React from 'react';
import numeral from 'numeral';
import { RouteComponentProps } from 'react-router-native';
import { View } from 'react-native';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { getAsset, KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import { _ } from 'utils/i18n';
import OrderBookProcessor from 'utils/order-book-processor';
import SpanText from 'components/span-text';
import RouterLink from 'components/router-link';
import CalculatorPair, { Side } from '../calculator-pair';
import { OperationMode } from '../common';
import styles from './order-book.style';

type OrderBookCalcFullProps = RouteComponentProps<{ operation: OperationMode }> & OrderBookCalcProps;
type OrderBookCalcProps = {
    market: KunaMarket;
    ticker: KunaV3Ticker;
    usdPrice?: number;
    orderBook: OrderBookProcessor;
};

type OrderBookCalcState = {
    values: [number, number];
    orderCounter: number;

    lastSide: Side;
    lastValue: number;
};

class OrderBookCalc extends React.PureComponent<OrderBookCalcFullProps, OrderBookCalcState> {
    public state: OrderBookCalcState = {
        values: [0, 0],
        orderCounter: 0,

        lastSide: Side.Base,
        lastValue: 0,
    };

    protected __calculatorPairRef: React.RefObject<CalculatorPair> = React.createRef<CalculatorPair>();

    public componentWillReceiveProps(nextProps: OrderBookCalcFullProps): void {
        if (this.props.match.params.operation === nextProps.match.params.operation) {
            return;
        }

        if (!this.__calculatorPairRef.current) {
            return;
        }

        const { lastSide, lastValue } = this.state;

        const mode = nextProps.match.params.operation;
        const result = [0, 0];

        switch (lastSide) {
            case Side.Base: {
                result[0] = lastValue;
                result[1] = this.__buildCalculateHandler(mode)(lastValue, lastSide);
                break;
            }

            case Side.Quote: {
                result[0] = this.__buildCalculateHandler(mode)(lastValue, lastSide);
                result[1] = lastValue;
                break;
            }
        }

        this.__calculatorPairRef.current.forceSetValues(result[0], result[1]);
    }

    public render(): JSX.Element {
        const { market, match } = this.props;
        const mode = match.params.operation;
        const baseAsset = getAsset(market.baseAsset);

        const buyButtonStyle = [
            styles.modeButton,
            styles.modeButtonBuy,
            mode === OperationMode.Buy ? styles.modeButtonActive : undefined,
        ];

        const sellButtonStyle = [
            styles.modeButton,
            styles.modeButtonSell,
            mode === OperationMode.Sell ? styles.modeButtonActive : undefined,
        ];

        return (
            <>
                <View style={styles.modeButtonsBox}>
                    <RouterLink to={`/${OperationMode.Buy}`} style={buyButtonStyle}>Buy {baseAsset.key}</RouterLink>
                    <RouterLink to={`/${OperationMode.Sell}`} style={sellButtonStyle}>Sell {baseAsset.key}</RouterLink>
                </View>

                <CalculatorPair market={market}
                                processCalculating={this.__buildCalculateHandler(mode, true)}
                                ref={this.__calculatorPairRef}
                />

                {this.__renderSecondaryInformation()}
            </>
        );
    }

    private __renderSecondaryInformation = (): JSX.Element => {
        const { market } = this.props;
        const { values } = this.state;

        return (
            <View style={styles.avgPrice}>
                <SpanText style={styles.avgPriceLabel}>
                    {_('calculator.average-price')}
                </SpanText>
                <SpanText style={styles.avgPriceValue}>
                    {numeral(values[1]).divide(values[0]).format(market.format)}
                </SpanText>
                <SpanText style={styles.avgPriceAsset}>
                    {market.quoteAsset} / {market.baseAsset}
                </SpanText>
            </View>
        );
    };


    private __buildCalculateHandler = (mode: OperationMode, updateLasts: boolean = false) => {
        const { orderBook } = this.props;

        const book = mode === OperationMode.Buy
            ? orderBook.getAsk(500)
            : orderBook.getBid(500);

        return (value: number, side: Side): number => {

            if (updateLasts) {
                this.setState({ lastValue: value, lastSide: side });
            }

            if (!value || value <= 0) {
                this.setState({ values: [0, 0], orderCounter: 0 });

                return 0;
            }

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
    };
}

export default compose<OrderBookCalcFullProps, OrderBookCalcProps>(withRouter)(OrderBookCalc);
