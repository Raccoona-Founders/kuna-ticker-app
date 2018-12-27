import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, KunaAssetUnit, kunaMarketMap, KunaOrderBook, KunaV3Ticker } from 'kuna-sdk';
import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { _ } from 'utils/i18n';
import { UsdCalculator } from 'utils/currency-rate';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import RippleNotice from 'components/ripple-notice';
import InfoUnit from 'components/info-unit';
import PriceChangeBox from './change-price-box';
import marketStyle from './market.style';


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

        AnalTracker.trackScreen(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'MarketScreen',
        );

        AnalTracker.logEvent('open_market', { market: currentMarket.key });
    }


    public render(): JSX.Element {
        const { ticker, usdRate, tickers } = this.props;

        if (!ticker) {
            return <ShadeScrollCard />;
        }

        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        const quoteAsset = getAsset(currentMarket.quoteAsset);
        const baseAsset = getAsset(currentMarket.baseAsset);

        const usdPrice = new UsdCalculator(usdRate, tickers).getPrice(symbol);

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
                            {numFormat(ticker.lastPrice || 0, currentMarket.format)} {quoteAsset.key}
                        </SpanText>

                        <PriceChangeBox
                            value={ticker.dailyChangePercent}
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
                              value={numFormat(ticker.volume)}
                              style={[marketStyle.infoUnit, marketStyle.infoUnitFirstLine]}
                    />

                    <InfoUnit topic={`Vol ${quoteAsset.key}`}
                              value={numFormat(numeral(ticker.volume).multiply(ticker.lastPrice || 0))}
                              style={[marketStyle.infoUnit, marketStyle.infoUnitFirstLine]}
                    />

                    <InfoUnit topic="24H Min"
                              value={numFormat(ticker.low, quoteAsset.format)}
                              style={marketStyle.infoUnit}
                    />

                    <InfoUnit topic="24H Max"
                              value={numFormat(ticker.high, quoteAsset.format)}
                              style={marketStyle.infoUnit}
                    />
                </View>

                <View style={marketStyle.separator} />

                {baseAsset.key === KunaAssetUnit.Ripple ? <RippleNotice /> : undefined}
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


    protected __openLastTrades = () => {
        this.props.navigation.push(RouteKeys.LastTrades, {
            marketSymbol: this.currentSymbol,
        });
    };


    protected __openCalculator = () => {
        this.props.navigation.push(RouteKeys.Calculator, {
            marketSymbol: this.currentSymbol,
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
