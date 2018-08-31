import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import { quoteAssetsStyles as styles } from './styles';

export const quoteAssets = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.StasisEuro,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.GolosGold,
];

type QuoteAssetsTabProps = {
    currentSymbol: KunaAssetUnit;
    onChooseAsset: (asset: KunaAssetUnit) => void;
};

export const QuoteAssetsTab = (props: QuoteAssetsTabProps) => {

    const { currentSymbol, onChooseAsset } = props;

    return (
        <View style={styles.container}>
            {quoteAssets.map((asset: KunaAssetUnit) => {
                const isActive = asset === currentSymbol;

                return (
                    <TouchableOpacity
                        key={asset}
                        onPress={() => onChooseAsset && onChooseAsset(asset)}
                        style={[styles.link, isActive ? styles.linkActive : {}]}
                    >
                        <Text style={[styles.text, isActive ? styles.textActive : {}]}>
                            {asset}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
