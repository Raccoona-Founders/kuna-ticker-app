import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';

import { quoteAssetsStyles as styles } from './styles';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

const quoteAssets = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.StasisEuro,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.GolosGold,
];

type QuoteAssetsTabProps = NavigationInjectedProps & {
    currentSymbol: KunaAssetUnit;
};

export const QuoteAssetsTab = withNavigation((props: QuoteAssetsTabProps) => {

    const {currentSymbol, navigation} = props;

    return (
        <View style={styles.container}>
            {quoteAssets.map((asset: KunaAssetUnit) => {
                const isActive = asset === currentSymbol;

                return (
                    <TouchableOpacity
                        key={asset}
                        onPress={() => navigation.navigate('Main', {symbol: asset})}
                        style={[styles.link, isActive ? styles.linkActive : {}]}
                    >
                        <Text style={[styles.text, isActive ? styles.textActive : {}]}>
                            {asset}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
});
