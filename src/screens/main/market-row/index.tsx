import React from 'react';
import Numeral from 'numeral';
import { Link } from 'react-router-native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { KunaMarket, KunaTicker } from 'kuna-sdk';

import { Color } from 'styles/variables';
import { MarketNameCell } from "./market-name-cell";

type MarketRowProps = {
    market: KunaMarket;
    ticker?: KunaTicker;
};

export const MarketRow = (props: MarketRowProps) => {
    const {market, ticker} = props;

    return (
        <Link to={ticker ? `/market/${market.key}` : '/'}
              key={market.key}
              style={styles.listItemLink}
              component={TouchableOpacity}
        >
            <View style={styles.listItem}>
                <MarketNameCell market={market}/>

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <Text style={styles.priceValue}>
                            {ticker ? (
                                parseFloat(ticker.last) > 0.0001
                                    ? Numeral(ticker.last).format(market.format)
                                    : Numeral(ticker.last).format('0,0.[00000000]')
                            ) : '--'}
                        </Text>
                        <Text style={styles.priceLabel}>{market.quoteAsset}</Text>
                    </View>

                    <View>
                        <Text style={styles.marketVolume}>
                            {ticker ? (
                                <>VOL: {Numeral(ticker.vol).format('0,0.[00]')} {market.baseAsset}</>
                            ) : '--'}
                        </Text>
                    </View>
                </View>
            </View>
        </Link>
    );
};


const styles = StyleSheet.create({
    listItemLink: {
        paddingLeft: 20,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 74,
        paddingRight: 20,
        backgroundColor: '#fff',
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1,
    },

    tickerCell: {
        alignItems: 'flex-end'
    },

    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '300',
        lineHeight: 16,
    },

    priceBox: {
        flexDirection: 'row',
        marginBottom: 5
    },
    priceValue: {
        marginRight: 4
    },
    priceLabel: {
        color: Color.TextDarkSecondary,
    },

    marketVolume: {
        fontSize: 10,
        fontWeight: '400'
    }
});