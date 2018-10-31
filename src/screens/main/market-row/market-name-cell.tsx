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
            <CoinIcon size={45} asset={baseAsset} style={{marginRight: 20}}/>
            <View>
                <View style={styles.marketRow}>
                    <Text style={[styles.pairBoxText, styles.pairBoxBase]}>{props.market.baseAsset}</Text>
                    <Text style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</Text>
                    <Text style={[styles.pairBoxText, styles.pairBoxQuote]}>{props.market.quoteAsset}</Text>
                </View>
                <View style={styles.baseAssetName}>
                    <Text style={styles.baseAssetNameText}>{baseAsset.name}</Text>
                </View>
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
        color: Color.DarkPurple,
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 18,
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 2,
        marginRight: 2,
        color: Color.Gray2,
        fontSize: 12,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 12,
        color: Color.Gray2,
        textAlignVertical: 'bottom',
    },
    baseAssetName: {
        marginTop: 5,
    },
    baseAssetNameText: {
        color: Color.Gray2,
    },
});