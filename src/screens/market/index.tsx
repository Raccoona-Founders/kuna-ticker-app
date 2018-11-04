import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View, Animated, Keyboard } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaMarketMap, KunaTicker } from 'kuna-sdk';

import { numFormat } from 'utils/number-helper';
import { trackScreen } from 'utils/ga-tracker';
import { Layout } from 'components/layout';
import { CoinIcon } from 'components/coin-icon';
import { SpanText } from 'components/span-text';

import { Calculator } from './calculator';
import { InfoUnit } from './info-unit';
import { styles, screen } from './styles';
import { UsdCalculator } from 'utils/currency-rate';

export class MarketScreenComponent extends React.PureComponent<MarketScreenProps> {

    protected _deltaY: Animated.Value;

    public constructor(props: MarketScreenProps) {
        super(props);

        this._deltaY = new Animated.Value(screen.height - 100);
    }


    public componentDidMount(): void {
        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        this.props.navigation.addListener('willBlur', () => {
            Keyboard.dismiss();
        });

        trackScreen(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'MarketScreen',
        );
    }


    public render(): JSX.Element {
        const {ticker} = this.props;

        const style = {
            top: 40,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
        };

        return (
            <Layout style={style}>
                <View style={styles.browContainer}>
                    <View style={styles.browItem}/>
                </View>

                {ticker ? this.renderMarketTicker() : ''}
            </Layout>
        );
    }


    protected renderMarketTicker() {
        const {ticker, usdRate, tickers} = this.props;
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
                              style={{marginRight: 20}}
                    />

                    <View>
                        <SpanText style={styles.topicAssetText}>
                            {currentMarket.baseAsset} / {currentMarket.quoteAsset}
                        </SpanText>

                        <SpanText style={styles.topicAssetSubtext}>
                            <SpanText style={styles.topicAssetSubtextName}>{baseAsset.name}</SpanText>
                            <SpanText> to </SpanText>
                            <SpanText style={styles.topicAssetSubtextName}>{quoteAsset.name}</SpanText>
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
                </View>
            </View>
        );
    }

    protected get currentSymbol(): string {
        return this.props.navigation.getParam('symbol');
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
