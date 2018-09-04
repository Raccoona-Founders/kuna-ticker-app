import React from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { KunaAsset, KunaAssetUnit } from 'kuna-sdk';
import { tabBarStyles } from 'screens/main/styles';
import { Color } from 'styles/variables';

export type AssetRoute = {
    key: KunaAssetUnit;
    title: string;
};

export const quoteAssets: AssetRoute[] = [
    {key: KunaAssetUnit.UkrainianHryvnia, title: 'UAH'},
    {key: KunaAssetUnit.Bitcoin, title: 'BTC'},
    {key: KunaAssetUnit.StasisEuro, title: 'EURS'},
    {key: KunaAssetUnit.Ethereum, title: 'ETH'},
    {key: KunaAssetUnit.GolosGold, title: 'GBG'},
];

type QuoteTabItemProps = {
    asset: KunaAsset;
    onPress: () => void;
    isActive?: boolean;

    interpolate: (active: any, inactive: any) => any;
};

export const QuoteTabItem = (props: QuoteTabItemProps) => {
    const {isActive = false, asset, interpolate} = props;

    const animatedStyle = {
        color: interpolate(Color.Dark, Color.TextSecondary),
        fontSize: interpolate(20, 14),
    };

    return (
        <TouchableOpacity style={tabBarStyles.tab} onPress={props.onPress}>
            <Animated.Text style={[tabBarStyles.text, animatedStyle]}>
                {asset.key}
            </Animated.Text>
        </TouchableOpacity>
    );
};