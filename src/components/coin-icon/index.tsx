import React from 'react';
import { View, StyleProp, ViewStyle, Text, StyleSheet } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { KunaAsset } from 'kuna-sdk';

import { svgIcons, findIcon } from './svg-icons';
import { coinShadow } from "styles/shadows";

type CoinIconProps = {
    asset: KunaAsset;

    withShadow?: boolean;
    size?: number;
    style?: StyleProp<ViewStyle>;
};

export const CoinIcon = (props: CoinIconProps) => {
    const {size = 32, withShadow = true, asset, style = {}} = props;

    const coinIconStyle = {
        height: size,
        width: size,
        borderRadius: size / 4,
        backgroundColor: asset.color,
    };

    const existsIcon = findIcon(asset);

    return (
        existsIcon ? (
            <View style={[coinIconStyle, withShadow ? coinShadow : {}, style]}>
                <SvgIcon svgs={svgIcons}
                         name={asset.key as string}
                         width={size}
                         height={size}
                         fill="#ffffff"
                />
            </View>
        ) : (
            <View style={[coinIconStyle, style, styles.onlySymbolView, withShadow ? coinShadow : {}]}>
                <Text style={[styles.onlySymbolText, {fontSize: size * 0.625}]}>
                    {asset.name.charAt(0).toUpperCase()}
                </Text>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    onlySymbolView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    onlySymbolText: {
        fontWeight: '700',
        color: '#fff',
    },
});
