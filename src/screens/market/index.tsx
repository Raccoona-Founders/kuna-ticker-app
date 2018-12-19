import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { View, Animated, Keyboard, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaMarketMap, KunaOrderBook, KunaV3Ticker, KunaAssetUnit } from 'kuna-sdk';

import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { fetchRiddle4Config } from 'utils/riddle';
import { UsdCalculator } from 'utils/currency-rate';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import { SpanText } from 'components/span-text';
import InfoUnit from 'components/info-unit';
import RippleNotice from 'components/ripple-notice';
import UIButton from 'components/ui-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import { _ } from 'utils/i18n';

import { Calculator } from './calculator';
import { styles, screen } from './styles';

type State = {
    depth: undefined | KunaOrderBook;
    riddle?: any;
};

export class MarketScreen extends React.PureComponent<MarketScreenProps, State> {
    public state: State = {
        depth: undefined,
        riddle: undefined,
    };

    protected _deltaY: Animated.Value;

    public constructor(props: MarketScreenProps) {
        super(props);

        this._deltaY = new Animated.Value(screen.height - 100);
    }

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[marketSymbol];

        try {
            const riddleConfig = await fetchRiddle4Config();
            if (riddleConfig.asset === currentMarket.baseAsset) {
                this.setState({
                    riddle: riddleConfig,
                });
            }
        } catch (error) {

        }

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

        const priceChangeStyles = [
            styles.priceChange,
            ticker.dailyChangePercent >= 0 ? styles.priceChangeUp : styles.priceChangeDown
        ];

        return (
            <ShadeScrollCard style={styles.marketInfoContainer}>
                <View style={styles.topic}>
                    <CoinIcon asset={getAsset(currentMarket.baseAsset)}
                              size={48}
                              style={{ marginRight: 20 }}
                    />

                    <View>
                        <SpanText style={styles.topicAssetText}>
                            {currentMarket.baseAsset} / {currentMarket.quoteAsset}
                        </SpanText>

                        <SpanText style={styles.topicAssetSubtext}>
                            <Text style={styles.topicAssetSubtextName}>{baseAsset.name}</Text>
                            <Text style={{ fontWeight: '400' }}> to </Text>
                            <Text style={styles.topicAssetSubtextName}>{quoteAsset.name}</Text>
                        </SpanText>
                    </View>
                </View>

                <View style={styles.priceContainer}>
                    <View style={styles.priceCoinContainer}>
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            <SpanText style={styles.priceTextValue}>
                                {numFormat(ticker.lastPrice || 0, currentMarket.format)}
                            </SpanText>
                            <SpanText style={styles.priceTextAsset}>{quoteAsset.key}</SpanText>
                        </View>

                        <View>
                            <SpanText style={priceChangeStyles}>
                                {numeral(ticker.dailyChangePercent).format('+0,0.00')}%
                            </SpanText>
                        </View>
                    </View>

                    <View style={styles.priceSecondaryInfoContainer}>
                        {usdPrice && (
                            <SpanText style={styles.priceUsd}>
                                ≈ ${usdPrice.format('0,0.[00]')}
                            </SpanText>
                        )}
                    </View>
                </View>

                <Calculator
                    market={currentMarket}
                    ticker={ticker}
                    usdPrice={usdPrice.value()}
                />

                <View style={styles.infoContainer}>
                    <InfoUnit topic={`Vol ${baseAsset.key}`}
                              value={numFormat(ticker.volume)}
                    />

                    <InfoUnit topic={`Vol ${quoteAsset.key}`}
                              value={numFormat(numeral(ticker.volume).multiply(ticker.lastPrice || 0))}
                    />

                    <InfoUnit topic="24H Min"
                              value={numFormat(ticker.low, quoteAsset.format)}
                    />

                    <InfoUnit topic="24H Max"
                              value={numFormat(ticker.high, quoteAsset.format)}
                    />

                    <UIButton onPress={this.__openDepth}>{_('market.order-book')}</UIButton>
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
