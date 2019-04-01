import React from 'react';
import { Alert, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { kunaMarketMap } from 'kuna-sdk';
import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { _ } from 'utils/i18n';
import UIIconButton from 'components/ui-icon-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import MarketBody from './components/market.body';
import marketStyle from './market.style';

type MarketScreenProps
    = NavigationInjectedProps<{ symbol: string; }>;

export default class MarketScreen extends React.Component<MarketScreenProps> {
    public async componentDidMount(): Promise<void> {
        AnalTracker.logEvent('open_market', { market: this._currentSymbol });
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
        Alert.alert('Temporarily unavailable');
        AnalTracker.logEvent('Market_TryLastTrades', { market: this._currentSymbol });

        // this.props.navigation.push(RouteKeys.Market_LastTrades, {
        //     marketSymbol: this._currentSymbol,
        // });
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
                        forcePressEnabled={true}
                    />
                </View>
            </View>
        );
    };
}
