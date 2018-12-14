import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View, Animated, Keyboard, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaMarketMap, KunaOrderBook, KunaTicker, KunaAssetUnit } from 'kuna-sdk';

import AnalTracker from 'utils/ga-tracker';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import { SpanText } from 'components/span-text';
import InfoUnit from 'components/info-unit';
import RippleNotice from 'components/ripple-notice';
import UIButton from 'components/ui-button';
import { ShadeScrollCard } from 'components/shade-navigator';

import { Calculator } from './calculator';

import { styles, screen } from './styles';
import { UsdCalculator } from 'utils/currency-rate';
import RouteKeys from 'router/route-keys';

type State = {
    depth: undefined | KunaOrderBook;
};

export class MarketScreen extends React.PureComponent<MarketScreenProps, State> {
    public state: State = {
        depth: undefined,
    };

    protected _deltaY: Animated.Value;

    public constructor(props: MarketScreenProps) {
        super(props);

        this._deltaY = new Animated.Value(screen.height - 100);
    }

    public componentDidMount() {
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
            <ShadeScrollCard style={styles.marketInfoContainer}>
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
                    <InfoUnit topic={`Vol ${baseAsset.key}`}
                              value={numFormat(ticker.vol)}
                    />

                    <InfoUnit topic={`Vol ${quoteAsset.key}`}
                              value={numFormat(Numeral(ticker.vol).multiply(ticker.last))}
                    />

                    <InfoUnit topic="24H Min"
                              value={numFormat(ticker.low, quoteAsset.format)}
                    />

                    <InfoUnit topic="24H Max"
                              value={numFormat(ticker.high, quoteAsset.format)}
                    />

                    <UIButton onPress={this.__openDepth}>Order book</UIButton>
                </View>

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

export default compose<MarketScreenProps, MarketScreenOuterProps>(
    connect(mapStateToProps),
)(MarketScreen);
