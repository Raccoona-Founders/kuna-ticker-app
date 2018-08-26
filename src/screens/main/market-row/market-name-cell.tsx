import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { KunaMarket, getAsset } from 'kuna-sdk';

import { CoinIcon } from 'components/coin-icon';
import { Color } from 'styles/variables';

type MarketNameProps = {
    market: KunaMarket;
};

export const MarketNameCell = (props: MarketNameProps) => {
    const baseAsset = getAsset(props.market.baseAsset);

    return (
        <View style={styles.container}>
            <CoinIcon size={32} asset={baseAsset} style={{marginRight: 20}}/>
            <View style={styles.marketRow}>
                <Text style={[styles.pairBoxText, styles.pairBoxBase]}>{props.market.baseAsset}</Text>
                <Text style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</Text>
                <Text style={[styles.pairBoxText, styles.pairBoxQuote]}>{props.market.quoteAsset}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    marketRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '300',
        lineHeight: 16,
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 2,
        marginRight: 2,
        color: Color.TextDarkSecondary,
        fontSize: 10,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 10,
        color: Color.TextDarkSecondary,
        textAlignVertical: 'bottom',
    },
});