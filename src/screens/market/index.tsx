import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View, Animated, Keyboard, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaMarketMap, KunaOrderBook, KunaV3Ticker, KunaAssetUnit } from 'kuna-sdk';

import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { UsdCalculator } from 'utils/currency-rate';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import { _ } from 'utils/i18n';
import {} from './styles';

type State = {
    depth: undefined | KunaOrderBook;
    riddle?: any;
};

export class MarketScreen extends React.PureComponent<MarketScreenProps, State> {
    public state: State = {
        depth: undefined,
        riddle: undefined,
    };

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[marketSymbol];

        this.props.navigation.addListener('willBlur', () => {
            Keyboard.dismiss();
        });

        AnalTracker.trackScreen(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'MarketScreen',
        );
    }


    public render(): JSX.Element {
        const { ticker } = this.props;

        if (!ticker) {
            return <ShadeScrollCard />;
        }

        return (
            <ShadeScrollCard>

            </ShadeScrollCard>
        );
    }

    protected get currentSymbol(): string {
        return this.props.navigation.getParam('symbol');
    }

    protected __openDepth = () => {
        this.props.navigation.push(RouteKeys.OrderBook, {
            marketSymbol: this.currentSymbol,
        });
    };
}

type MarketScreenOuterProps = NavigationInjectedProps<{ symbol: string; }>;

type ConnectedProps = {
    ticker: KunaV3Ticker;
    tickers: Record<string, KunaV3Ticker>;
    usdRate: number;
}

type MarketScreenProps = ConnectedProps & MarketScreenOuterProps;

const mapStateToProps = (store: KunaStore, ownProps: MarketScreenProps): ConnectedProps => {
    const symbol = ownProps.navigation.getParam('symbol');

    if (!symbol) {
        throw new Error('No symbol');
    }

    return {
        ticker: store.ticker.tickers[symbol],
        tickers: store.ticker.tickers,
        usdRate: store.ticker.usdRate,
    };
};

export default compose<MarketScreenProps, MarketScreenOuterProps>(
    connect(mapStateToProps),
)(MarketScreen);
