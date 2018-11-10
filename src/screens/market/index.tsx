import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View, Animated, Keyboard, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { kunaApiClient, getAsset, kunaMarketMap, KunaOrderBook, KunaTicker, KunaAsset, KunaAssetUnit } from 'kuna-sdk';

import { numFormat } from 'utils/number-helper';
import { trackScreen } from 'utils/ga-tracker';
import { CoinIcon } from 'components/coin-icon';
import { SpanText } from 'components/span-text';
import RippleNotice from 'components/ripple-notice';

import { Calculator } from './calculator';
import { InfoUnit } from './info-unit';
import { styles, screen } from './styles';
import { UsdCalculator } from 'utils/currency-rate';
import { Color } from 'styles/variables';

type State = {
    depth: undefined | KunaOrderBook;
};

export class MarketScreenComponent extends React.PureComponent<MarketScreenProps, State> {
    public state: State = {
        depth: undefined,
    };

    protected _deltaY: Animated.Value;

    public constructor(props: MarketScreenProps) {
        super(props);

        this._deltaY = new Animated.Value(screen.height - 100);
    }

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[marketSymbol];

        this.props.navigation.addListener('willBlur', () => {
            Keyboard.dismiss();
        });

        trackScreen(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'MarketScreen',
        );

        const depth = await kunaApiClient.getOrderBook(marketSymbol);
        this.setState({ depth });
    }


    public render(): JSX.Element {
        const { ticker, usdRate, tickers } = this.props;

        if (!ticker) {
            return <View />;
        }

        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        const quoteAsset = getAsset(currentMarket.quoteAsset);
        const baseAsset = getAsset(currentMarket.baseAsset);

        const usdPrice = new UsdCalculator(usdRate, tickers).getPrice(symbol);

        return (
            <View style={styles.marketInfoContainer}>
                <View style={styles.topic}>
                    <CoinIcon asset={getAsset(currentMarket.baseAsset)}
                              size={48}
                              style={{ marginRight: 20 }} />

                    <View>
                        <SpanText style={styles.topicAssetText}>
                            {currentMarket.baseAsset} / {currentMarket.quoteAsset}
                        </SpanText>

                        <SpanText style={styles.topicAssetSubtext}>
                            <Text style={styles.topicAssetSubtextName}>{baseAsset.name}</Text>
                            <Text style={{ fontWeight: '400' }}> to </Text>
                            <Text style={styles.topicAssetSubtextName}>{quoteAsset.name}</Text>
                        </SpanText>

                        <View style={styles.priceContainer}>
                            <View style={styles.priceMarketContainer}>
                                <SpanText style={styles.priceTextValue}>
                                    {numFormat(ticker.last, currentMarket.format)}
                                </SpanText>
                                <SpanText style={styles.priceTextAsset}>{quoteAsset.key}</SpanText>
                            </View>

                            {usdPrice && (
                                <SpanText style={styles.priceUsd}>
                                    ≈ ${usdPrice.format('0,0.[00]')}
                                </SpanText>
                            )}
                        </View>
                    </View>
                </View>

                {ticker.last && (
                    <Calculator
                        market={currentMarket}
                        ticker={ticker}
                        usdPrice={usdPrice.value()}
                    />
                )}

                <View style={styles.infoContainer}>
                    <InfoUnit topic={`Volume ${baseAsset.key}`}
                              value={numFormat(ticker.vol)}
                    />

                    <InfoUnit topic={`Volume ${quoteAsset.key}`}
                              value={numFormat(Numeral(ticker.vol).multiply(ticker.last))}
                    />

                    <InfoUnit topic="24H Low"
                              value={numFormat(ticker.low, quoteAsset.format)}
                    />

                    <InfoUnit topic="24H High"
                              value={numFormat(ticker.high, quoteAsset.format)}
                    />

                    {this._renderDepth(baseAsset)}
                </View>

                {baseAsset.key === KunaAssetUnit.Ripple ? <RippleNotice /> : undefined}
            </View>
        );
    }

    protected get currentSymbol(): string {
        return this.props.navigation.getParam('symbol');
    }

    protected _renderDepth(quoteAsset: KunaAsset): JSX.Element | undefined {
        const { depth } = this.state;

        if (!depth) {
            return <View />;
        }

        const { ticker } = this.props;

        const minPrice = +ticker.last * 0.9;
        const bidDepth: number = depth.bids.reduce((sum: number, [price, value]) => (
            +price >= minPrice ? sum + (+value) : sum
        ), 0);

        const maxPrice = +ticker.last * 1.1;
        const asksDepth: number = depth.asks.reduce((sum: number, [price, value]) => (
            +price <= maxPrice ? sum + (+value) : sum
        ), 0);

        return (
            <>
                <InfoUnit
                    topic="Bid 10%"
                    value={Numeral(bidDepth).format('0,0.[00]') + ' ' + quoteAsset.key}
                    valueColor={Color.Danger}
                />

                <InfoUnit
                    topic="Ask 10%"
                    value={Numeral(asksDepth).format('0,0.[00]') + ' ' + quoteAsset.key}
                    valueColor={Color.Main}
                />
            </>
        );
    }
}

type MarketScreenOuterProps = NavigationInjectedProps<{ symbol: string; }>;

type ConnectedProps = {
    ticker: KunaTicker;
    tickers: Record<string, KunaTicker>;
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

export const MarketScreen = compose<MarketScreenProps, MarketScreenOuterProps>(
    connect(mapStateToProps),
)(MarketScreenComponent);
