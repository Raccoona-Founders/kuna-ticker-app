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
import UIButton from 'components/ui-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import RippleNotice from 'components/ripple-notice';
import InfoUnit from 'components/info-unit';
import PriceChangeBox from './components/change-price-box';
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

        AnalTracker.trackScreen(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'MarketScreen',
        );

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
                        <SpanText style={marketStyle.price} weight="700">
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

                <View style={marketStyle.separator} />

                <View style={[marketStyle.section, marketStyle.sectionInformation]}>
                    <InfoUnit topic={`Vol ${baseAsset.key}`}
                              value={numFormat(tick.volume)}
                              style={[marketStyle.infoUnit, marketStyle.infoUnitFirstLine]}
                    />

                    <InfoUnit topic={`Vol ${quoteAsset.key}`}
                              value={numFormat(numeral(tick.volume).multiply(tick.lastPrice || 0))}
                              style={[marketStyle.infoUnit, marketStyle.infoUnitFirstLine]}
                    />

                    <InfoUnit topic="24H Min"
                              value={numFormat(tick.low, quoteAsset.format)}
                              style={marketStyle.infoUnit}
                    />

                    <InfoUnit topic="24H Max"
                              value={numFormat(tick.high, quoteAsset.format)}
                              style={marketStyle.infoUnit}
                    />
                </View>

                <View style={marketStyle.separator} />

                {baseAsset.key === KunaAssetUnit.Ripple ? <RippleNotice /> : undefined}
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
                    <UIButton onPress={this.__openDepth}>{_('market.order-book')}</UIButton>
                </View>

                <View style={marketStyle.footerButton}>
                    <UIButton onPress={this.__openCalculator}>{_('market.calculate')}</UIButton>
                </View>
            </View>
        );
    };
}
