import React from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { Router, Switch, Route } from 'react-router-native';
import * as History from 'history';
import { NavigationInjectedProps } from 'react-navigation';
import { kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import { connect } from 'react-redux';
import kunaClient from 'utils/kuna-api';
import AnalTracker from 'utils/ga-tracker';
import { UsdCalculator } from 'utils/currency-rate';
import OrderBookProcessor from 'utils/order-book-processor';
import SpanText from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import { CalculatorMode, OperationMode } from './common';
import OrderBookCalc from './order-book';


type State = {
    orderBook?: OrderBookProcessor;
    mode: CalculatorMode
};

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

@(connect(mapStateToProps) as any)
export default class CalculatorScreen extends React.PureComponent<CalculatorScreenProps, State> {
    public state: State = {
        orderBook: undefined,
        mode: CalculatorMode.LastPrice,
    };

    protected _history: History.MemoryHistory;

    public constructor(props: CalculatorScreenProps) {
        super(props);

        this._history = History.createMemoryHistory({
            initialIndex: 0,
            initialEntries: [`/${OperationMode.Buy}`],
        });
    }

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
        const { ticker } = this.props;

        if (!ticker) {
            return <ShadeScrollCard />;
        }

        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        return (
            <ShadeScrollCard style={{ paddingLeft: 20, paddingRight: 20 }}>
                <SpanText style={{ fontSize: 24, marginBottom: 20 }}>
                    Calculate {currentMarket.baseAsset}/{currentMarket.quoteAsset}
                </SpanText>
                <Router history={this._history}>{this.__renderRouterPart()}</Router>
            </ShadeScrollCard>
        );
    }


    protected get currentSymbol(): string {
        return this.props.navigation.getParam('marketSymbol');
    }


    protected __renderRouterPart = () => {
        return (
            <Switch>
                <Route path="/:operation"
                       render={this.__renderOrderBookCalculator}
                />
            </Switch>
        );
    };

    protected __renderOrderBookCalculator = () => {
        const { usdRate, tickers, ticker } = this.props;

        const { orderBook } = this.state;

        if (!orderBook) {
            return <ActivityIndicator />;
        }

        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];
        const usdPrice = new UsdCalculator(usdRate, tickers).getPrice(symbol);

        return (
            <OrderBookCalc
                ticker={ticker}
                orderBook={orderBook}
                market={currentMarket}
                usdPrice={usdPrice.value()}
            />
        );
    };
}
