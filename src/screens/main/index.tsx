import React from 'react';
import Numeral from 'numeral';
import { map, find } from 'lodash';
import { Link } from 'react-router-native';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaMarketMap, KunaMarket, getAsset, KunaTicker, kunaApiClient } from 'kuna-sdk';
import { Color } from 'styles/variables';
import { FillShadow } from 'styles/shadows';

import { Topic } from 'components/topic';
import { CoinIcon } from 'components/coin-icon';

type MarketTickerProps = {
    market: KunaMarket;
};

type MainScreenProps = {};
type MainScreenState = {
    tickers: KunaTicker[];
};

export class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        tickers: [],
    };

    public async componentDidMount(): Promise<void> {
        tracker.trackScreenView('home');

        const tickers = await kunaApiClient.getTickers();
        this.setState({ tickers: tickers });
    }

    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Topic title="Kuna Markets" />
                <ScrollView style={styles.flatList}>
                    {map(kunaMarketMap, market => this.renderTicker({ market: market }))}
                </ScrollView>
            </View>
        );
    }

    protected renderTicker = (props: MarketTickerProps): JSX.Element => {
        const { market } = props;

        const baseAsset = getAsset(market.baseAsset);
        const ticker = this.findTicker(market);

        return (
            <Link to={`/market/${market.key}`}
                  key={market.key}
                  style={styles.listItemLink}
                  component={TouchableOpacity}
            >
                <View style={styles.listItem}>
                    <CoinIcon size={24} asset={baseAsset} style={{ marginRight: 10 }} />
                    <View style={styles.marketBox}>
                        <Text style={[styles.pairBoxText, styles.pairBoxBase]}>{market.baseAsset}</Text>
                        <Text style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</Text>
                        <Text style={[styles.pairBoxText, styles.pairBoxQuote]}>{market.quoteAsset}</Text>
                    </View>

                    {ticker && (
                        <View style={styles.priceBox}>
                            <Text style={styles.priceValue}>
                                {parseFloat(ticker.last) > 0.0001
                                    ? Numeral(ticker.last).format(market.format)
                                    : Numeral(ticker.last).format('0,0.[00000000]')
                                }
                            </Text>
                            <Text style={styles.priceLabel}>{market.quoteAsset}</Text>
                        </View>
                    )}
                </View>
            </Link>
        );
    };

    protected findTicker(market: KunaMarket): KunaTicker | undefined {
        return find(this.state.tickers, { pair: market.key });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 57,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        ...FillShadow,
    },
    listItemLink: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },

    marketBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '300',
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 4,
        marginRight: 4,
        color: Color.TextDarkSecondary,
        fontSize: 12,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 12,
        color: Color.TextDarkSecondary,
        textAlignVertical: 'bottom',
    },

    priceBox: {
        flexDirection: 'row',
    },
    priceValue: {
        fontWeight: '500',
        marginRight: 5
    },
    priceLabel: {
        color: Color.TextDarkSecondary,
    },
});
