import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaMarketMap, KunaTicker, KunaAssetUnit } from 'kuna-sdk';

import { numFormat } from 'utils/number-helper';
import { tracker } from 'utils/ga-tracker';
import { Layout } from 'components/layout';
import { CoinIcon } from 'components/coin-icon';
import { Topic } from 'components/topic';

import { Calculator } from './calculator';
import { InfoUnit } from './info-unit';
import { styles } from './styles';

export class MarketScreenComponent extends React.PureComponent<MarketScreenProps> {

    public componentDidMount(): void {
        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        tracker.trackScreenView(
            `market/${currentMarket.baseAsset}-${currentMarket.quoteAsset}`,
        );
    }


    public render(): JSX.Element {
        const {ticker} = this.props;

        return (
            <Layout>
                <Topic leftContent={this.renderTopicBackButton()}/>
                {ticker ? this.renderMarketTicker() : ''}
            </Layout>
        );
    }


    protected renderMarketTicker() {

        const {ticker, usdRate} = this.props;
        const symbol = this.currentSymbol;
        const currentMarket = kunaMarketMap[symbol];

        const quoteAsset = getAsset(currentMarket.quoteAsset);
        const baseAsset = getAsset(currentMarket.baseAsset);

        return (
            <View style={styles.marketInfoContainer}>

                <View style={styles.topic}>
                    <View style={styles.topicAsset}>
                        <CoinIcon asset={getAsset(currentMarket.baseAsset)}
                                  size={48}
                                  style={{marginRight: 20}}
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

                    {quoteAsset.key === KunaAssetUnit.UkrainianHryvnia && (
                        <Text style={styles.priceUsd}>
                            $ {Numeral(ticker.last).divide(usdRate).format('0,0.[00]')}
                        </Text>
                    )}
                </View>

                {ticker.last ? <Calculator market={currentMarket} ticker={ticker}/> : undefined}

                <View style={styles.infoContainer}>
                    <InfoUnit topic={`Volume ${baseAsset.key}`}
                              value={numFormat(ticker.vol)}
                    />

                    <InfoUnit topic={`Volume ${quoteAsset.key}`}
                              value={numFormat(Numeral(ticker.vol).multiply(ticker.last))}
                    />

                    <InfoUnit topic="Low Price"
                              value={numFormat(ticker.low, quoteAsset.format)}
                    />

                    <InfoUnit topic="High Price"
                              value={numFormat(ticker.high, quoteAsset.format)}
                    />
                </View>
            </View>
        )
    }

    protected get currentSymbol(): string {
        return this.props.navigation.getParam('symbol');
    }

    protected renderTopicBackButton() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
        );
    }
}

type MarketScreenOuterProps = NavigationInjectedProps<{ symbol: string; }>;

type ConnectedProps = {
    ticker: KunaTicker;
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
        usdRate: store.ticker.usdRate,
    };
};

export const MarketScreen = compose<MarketScreenProps, MarketScreenOuterProps>(
    connect(mapStateToProps),
)(MarketScreenComponent);
