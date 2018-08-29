import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { KunaMarket, KunaTicker } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import { Color } from 'styles/variables';

import { MarketNameCell } from './market-name-cell';

type MarketRowProps = NavigationInjectedProps & {
    market: KunaMarket;
    ticker?: KunaTicker;
};

export const MarketRow = withNavigation((props: MarketRowProps) => {
    const {market, ticker, navigation} = props;

    const onPress = () => {
        if (!ticker) {
            return;
        }

        navigation.navigate('Market', {symbol: market.key});
    };

    return (
        <TouchableOpacity key={market.key} onPress={onPress} style={styles.listItemLink}>
            <View style={styles.listItem}>
                <MarketNameCell market={market}/>

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <Text style={styles.priceValue}>
                            {ticker ? numFormat(ticker.last, market.format) : '--'}
                        </Text>
                        <Text style={styles.priceLabel}>{market.quoteAsset}</Text>
                    </View>

                    <View>
                        <Text style={styles.marketVolume}>
                            {ticker ? (
                                <>VOL: {numFormat(ticker.vol)} {market.baseAsset}</>
                            ) : '--'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
})


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
        borderBottomColor: Color.BorderLight,
        borderBottomWidth: 1,
    },

    tickerCell: {
        alignItems: 'flex-end',
    },

    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '300',
        lineHeight: 16,
    },

    priceBox: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    priceValue: {
        marginRight: 4,
    },
    priceLabel: {
        color: Color.TextDarkSecondary,
    },

    marketVolume: {
        fontSize: 10,
        fontWeight: '400',
    },
});