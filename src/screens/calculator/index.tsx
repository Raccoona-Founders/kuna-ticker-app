import React from 'react';
import { Keyboard } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import kunaClient from 'utils/kuna-api';
import AnalTracker from 'utils/ga-tracker';
import { UsdCalculator } from 'utils/currency-rate';
import OrderBookProcessor from 'utils/order-book-processor';
import { ShadeScrollCard } from 'components/shade-navigator';
import LastTradeCalc from './last-trade';
import SpanText from 'components/span-text';

enum CalculatorMode {
    LastPrice = 'last-price',
    OrderBook = 'order-book',
}

type State = {
    orderBook?: OrderBookProcessor;
    mode: CalculatorMode
};


class CalculatorScreen extends React.PureComponent<CalculatorScreenProps, State> {
    public state: State = {
        orderBook: undefined,
        mode: CalculatorMode.LastPrice,
    };

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[marketSymbol];

        this.props.navigation.addListener('willBlur', () => {
            Keyboard.dismiss();
        });

        AnalTracker.trackScreen(
            `calculator/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'CalculatorScreen',
        );

        AnalTracker.logEvent('use_calculator', {
            market: currentMarket.key,
        });

        try {
            const orderBook = await kunaClient.getOrderBook(marketSymbol);

            this.setState({
                orderBook: new OrderBookProcessor(orderBook, 35),
            });
        } catch (error) {
            console.warn(error);
        }
    }

    public render(): JSX.Element {
        const { ticker, usdRate, tickers } = this.props;

        if (!ticker) {
            return <ShadeScrollCard />;
        }

        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        const usdPrice = new UsdCalculator(usdRate, tickers).getPrice(symbol);

        return (
            <ShadeScrollCard style={{ paddingLeft: 20, paddingRight: 20 }}>
                <SpanText style={{ fontSize: 24, marginBottom: 20 }}>
                    Calculate {currentMarket.baseAsset}/{currentMarket.quoteAsset}
                </SpanText>

                <LastTradeCalc
                    market={currentMarket}
                    ticker={ticker}
                    usdPrice={usdPrice.value()}
                />
            </ShadeScrollCard>
        );
    }

    protected get currentSymbol(): string {
        return this.props.navigation.getParam('marketSymbol');
    }
}


type CalculatorScreenOuterProps = NavigationInjectedProps<{ marketSymbol: string; }>;

type ConnectedProps = {
    ticker: KunaV3Ticker;
    tickers: Record<string, KunaV3Ticker>;
    usdRate: number;
}

type CalculatorScreenProps = ConnectedProps & CalculatorScreenOuterProps;

const mapStateToProps = (store: KunaStore, ownProps: CalculatorScreenOuterProps): ConnectedProps => {
    const symbol = ownProps.navigation.getParam('marketSymbol');

    if (!symbol) {
        throw new Error('No symbol');
    }

    return {
        ticker: store.ticker.tickers[symbol],
        tickers: store.ticker.tickers,
        usdRate: store.ticker.usdRate,
    };
};

export default compose<CalculatorScreenProps, CalculatorScreenOuterProps>(
    connect(mapStateToProps),
)(CalculatorScreen);
