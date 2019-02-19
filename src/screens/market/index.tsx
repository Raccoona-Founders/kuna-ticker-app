import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, KunaAssetUnit, kunaMarketMap, KunaOrderBook } from 'kuna-sdk';
import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { _ } from 'utils/i18n';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import SpanText from 'components/span-text';
import UIIconButton from 'components/ui-icon-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import RippleNotice from 'components/ripple-notice';
import InfoUnit from 'components/info-unit';

import PriceChangeBox from './components/change-price-box';
import Chart from './components/chart';
import MinMaxIndicator from './components/min-max-indicator';
import marketStyle from './market.style';
import { Color, DefaultStyles } from 'styles/variables';

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
        const { Ticker } = this.props;

        const symbol = this._currentSymbol;
        const tick = Ticker.getTicker(symbol);

        if (!tick) {
            return <ShadeScrollCard />;
        }

        const currentMarket = kunaMarketMap[symbol];
        const quoteAsset = getAsset(currentMarket.quoteAsset);
        const baseAsset = getAsset(currentMarket.baseAsset);

        const usdPrice = Ticker.usdCalculator.getPrice(symbol);

        return (
            <ShadeScrollCard renderFooter={this.__renderFooter}>
                <View style={marketStyle.topic}>
                    <CoinIcon asset={getAsset(currentMarket.baseAsset)}
                              naked={true}
                              withShadow={false}
                              size={68}
                              style={{ marginRight: 20 }}
                    />

                    <View style={marketStyle.topicName}>
                        <SpanText style={marketStyle.topicNameUnit}>
                            {currentMarket.baseAsset}/{currentMarket.quoteAsset}
                        </SpanText>
                        <SpanText style={marketStyle.topicNameFullname}>
                            {baseAsset.name} to {quoteAsset.name}
                        </SpanText>
                    </View>
                </View>

                <View style={marketStyle.separator} />

                <View style={[marketStyle.section, marketStyle.sectionPrice]}>
                    <View>
                        <SpanText style={marketStyle.price}>
                            {numFormat(tick.lastPrice || 0, currentMarket.format)} {quoteAsset.key}
                        </SpanText>

                        <PriceChangeBox
                            value={tick.dailyChangePercent}
                            style={{ position: 'absolute', right: 0, top: 0 }}
                        />

                        {usdPrice && (
                            <SpanText style={marketStyle.priceUsd}>
                                ~ ${usdPrice.format('0,0.[00]')}
                            </SpanText>
                        )}
                    </View>
                </View>

                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <Chart market={currentMarket} />

                    <View style={[marketStyle.section, marketStyle.sectionInformation]}>
                        <InfoUnit topic="Vol $"
                                  value={numFormat(numeral(tick.volume).multiply(usdPrice.value()), '$0,0.[00]')}
                                  style={marketStyle.infoUnit}
                                  valueStyle={DefaultStyles.boldFont}
                        />

                        <InfoUnit topic={`Vol ${baseAsset.key}`}
                                  value={numFormat(tick.volume)}
                                  style={marketStyle.infoUnit}

                        />

                        <InfoUnit topic={`Vol ${quoteAsset.key}`}
                                  value={numFormat(numeral(tick.volume).multiply(tick.lastPrice || 0))}
                                  style={marketStyle.infoUnit}
                        />
                    </View>

                    <MinMaxIndicator
                        market={currentMarket}
                        min={tick.low}
                        max={tick.high}
                        price={tick.lastPrice || 0}
                    />


                    {baseAsset.key === KunaAssetUnit.Ripple ? (
                        <>
                            <View style={marketStyle.separator} />
                            <RippleNotice />
                        </>
                    ) : undefined}
                </View>
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
