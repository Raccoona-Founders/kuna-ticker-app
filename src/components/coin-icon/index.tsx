import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { KunaAsset } from 'kuna-sdk';

import { svgIcons, findIcon } from './svg-icons';
import { coinShadow } from "styles/shadows";

type CoinIconProps = {
    asset: KunaAsset;

    size?: number;
    style?: StyleProp<ViewStyle>;
};

export const CoinIcon = (props: CoinIconProps) => {
    const { size = 32, asset, style = {} } = props;

    const coinIconStyle = {
        height: size,
        width: size,
        borderRadius: size / 4,
        backgroundColor: asset.color,
        ...coinShadow
    };

    const existsIcon = findIcon(asset);

    return (
        existsIcon ? (
            <View style={[coinIconStyle, style]}>
                <SvgIcon svgs={svgIcons}
                         name={asset.key as string}
                         width={size}
                         height={size}
                         fill="#ffffff"
                />
            </View>
        ) : (
            <View style={[coinIconStyle, style]} />
        )
    );
};
