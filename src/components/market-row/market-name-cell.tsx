import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KunaMarket, getAsset } from 'kuna-sdk';
import { SpanText } from 'components/span-text';
import { CoinIcon } from 'components/coin-icon';
import { Color } from 'styles/variables';

type MarketNameProps = {
    market: KunaMarket;
};

export const MarketNameCell = (props: MarketNameProps) => {
    const baseAsset = getAsset(props.market.baseAsset);

    return (
        <View style={styles.container}>
            <CoinIcon size={45}
                      asset={baseAsset}
                      style={{ marginRight: 20 }}
                      withShadow={false}
            />

            <View>
                <View style={styles.marketRow}>
                    <SpanText style={[styles.pairBoxText, styles.pairBoxBase]}>{props.market.baseAsset}</SpanText>
                    <SpanText style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</SpanText>
                    <SpanText style={[styles.pairBoxText, styles.pairBoxQuote]}>{props.market.quoteAsset}</SpanText>
                </View>
                <View style={styles.baseAssetName}>
                    <SpanText style={styles.baseAssetNameText}>{baseAsset.name}</SpanText>
                </View>
            </View>
        </View>
    );
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
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 2,
        marginRight: 2,
        color: Color.GrayBlues,
        fontSize: 12,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 12,
        color: Color.GrayBlues,
        textAlignVertical: 'bottom',
    },
    baseAssetName: {
        marginTop: 3,
    },
    baseAssetNameText: {
        color: Color.GrayBlues,
    },
});