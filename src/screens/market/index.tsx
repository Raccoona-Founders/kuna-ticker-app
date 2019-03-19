import React from 'react';
import { compose } from 'recompose';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps } from 'react-navigation';
import { kunaMarketMap, KunaOrderBook } from 'kuna-sdk';
import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { _ } from 'utils/i18n';
import UIIconButton from 'components/ui-icon-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import MarketBody from './components/market.body';
import marketStyle from './market.style';

type State = {
    depth: undefined | KunaOrderBook;
    riddle?: any;
};

type MarketScreenOuterProps = NavigationInjectedProps<{ symbol: string; }>;

type MarketScreenProps = MarketScreenOuterProps & mobx.ticker.WithTickerProps;

// @ts-ignore
@compose<MarketScreenProps, MarketScreenOuterProps>(
    inject('Ticker'),
    observer,
)
export default class MarketScreen extends React.Component<MarketScreenProps, State> {
    public state: State = {
        depth: undefined,
        riddle: undefined,
    };

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this._currentSymbol;
        const currentMarket = kunaMarketMap[marketSymbol];

        AnalTracker.logEvent('open_market', { market: currentMarket.key });
    }


    public render(): JSX.Element {
        const symbol = this._currentSymbol;
        const market = kunaMarketMap[symbol];

        return (
            <ShadeScrollCard renderFooter={this.__renderFooter}>
                <MarketBody
                    marketSymbol={symbol}
                    market={market}
                />
            </ShadeScrollCard>
        );
    }

    protected get _currentSymbol(): string {
        return this.props.navigation.getParam('symbol');
    }


    protected __openDepth = () => {
        this.props.navigation.push(RouteKeys.Market_OrderBook, {
            marketSymbol: this._currentSymbol,
        });
    };


    protected __openLastTrades = () => {
        this.props.navigation.push(RouteKeys.Market_LastTrades, {
            marketSymbol: this._currentSymbol,
        });
    };


    protected __openCalculator = () => {
        this.props.navigation.push(RouteKeys.Market_Calculator, {
            marketSymbol: this._currentSymbol,
        });
    };


    private __renderFooter = () => {
        return (
            <View style={marketStyle.footer}>
                <View style={marketStyle.footerButton}>
                    <UIIconButton
                        icon="book"
                        onPress={this.__openDepth}
                        title={_('market.order-book')}
                    />
                </View>

                <View style={marketStyle.footerButton}>
                    <UIIconButton
                        icon="calculator"
                        onPress={this.__openCalculator}
                        title={_('market.calculate')}
                    />
                </View>

                <View style={marketStyle.footerButton}>
                    <UIIconButton
                        icon="exchange-alt"
                        onPress={this.__openLastTrades}
                        title={_('market.last-trades')}
                        disabled={true}
                    />
                </View>
            </View>
        );
    };
}
