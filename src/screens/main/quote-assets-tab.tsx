import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { KunaAssetUnit } from 'kuna-sdk';

import { quoteAssetsStyles as styles } from './styles';

const quoteAssets = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.GolosGold,
];

type QuoteAssetsTabProps = {
    currentSymbol: KunaAssetUnit;
};

export const QuoteAssetsTab = (props: QuoteAssetsTabProps) => {
    return (
        <View style={styles.container}>
            {quoteAssets.map((asset: KunaAssetUnit) => {
                const isActive = asset === props.currentSymbol;
                return (
                    <Link key={asset}
                          to={`/main/${asset}`}
                          component={TouchableOpacity}
                          style={[
                              styles.link,
                              isActive ? styles.linkActive : {}
                          ]}
                    >
                        <Text style={[
                            styles.text,
                            isActive ? styles.textActive : {}
                        ]}>{asset}</Text>
                    </Link>
                );
            })}
        </View>
    )
};
