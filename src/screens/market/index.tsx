import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Text, View, Animated } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaMarketMap, KunaTicker, KunaAssetUnit } from 'kuna-sdk';

import { numFormat } from 'utils/number-helper';
import { trackScreen } from 'utils/ga-tracker';
import { Layout } from 'components/layout';
import { CoinIcon } from 'components/coin-icon';

import { Calculator } from './calculator';
import { InfoUnit } from './info-unit';
import { styles, screen } from './styles';

export class MarketScreenComponent extends React.PureComponent<MarketScreenProps> {


    protected _deltaY: Animated.Value;


    public constructor(props: MarketScreenProps) {
        super(props);

        this._deltaY = new Animated.Value(screen.height - 100);
    }


    public componentDidMount(): void {
        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        trackScreen(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
            'MarketScreen',
        );
    }


    public render(): JSX.Element {
        const { ticker } = this.props;

        const style = {
            top: 40,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        };

        return (
            <Layout style={style}>
                {ticker ? this.renderMarketTicker() : ''}
            </Layout>
        );
    }


    protected renderMarketTicker() {
        const { ticker } = this.props;
        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        const quoteAsset = getAsset(currentMarket.quoteAsset);
        const baseAsset = getAsset(currentMarket.baseAsset);

        const usdPrice = this.calcUsdPrice();

        return (
            <View style={styles.marketInfoContainer}>
                <View style={styles.topic}>
                    <View style={styles.topicAsset}>
                        <CoinIcon asset={getAsset(currentMarket.baseAsset)}
                                  size={48}
                                  style={{ marginRight: 20 }}
                        />
                        <View>
                            <Text style={styles.topicAssetText}>
                                {currentMarket.baseAsset} / {currentMarket.quoteAsset}
                            </Text>
                            <Text style={styles.topicAssetSubtext}>
                                <Text style={styles.topicAssetSubtextName}>{baseAsset.name}</Text>
                                <Text> to </Text>
                                <Text style={styles.topicAssetSubtextName}>{quoteAsset.name}</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.priceContainer}>
                    <View style={styles.priceMarketContainer}>
                        <Text style={styles.priceTopic}>Price for 1 {baseAsset.key}</Text>
                        <Text style={styles.priceTextValue}>{numFormat(ticker.last, currentMarket.format)}</Text>
                        <Text style={styles.priceTextAsset}>{quoteAsset.key}</Text>
                    </View>

                    {usdPrice && (
                        <Text style={styles.priceUsd}>
                            $ {usdPrice.format('0,0.[00]')}
                        </Text>
                    )}
                </View>

                {ticker.last && <Calculator market={currentMarket} ticker={ticker} usdPrice={usdPrice} />}

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


    protected calcUsdPrice = (): Numeral | undefined => {
        const currentMarket = kunaMarketMap[this.currentSymbol];
        const { ticker, tickers, usdRate } = this.props;

        switch (currentMarket.quoteAsset) {
            case KunaAssetUnit.UkrainianHryvnia:
                return Numeral(ticker.last).divide(usdRate);

            case KunaAssetUnit.Bitcoin:
                const btcTicker = tickers['btcuah'];
                if (!btcTicker) {
                    return undefined;
                }

                return Numeral(ticker.last).multiply(btcTicker.last).divide(usdRate);
        }

        return undefined;
    };


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
