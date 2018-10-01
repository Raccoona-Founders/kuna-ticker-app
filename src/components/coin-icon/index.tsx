import React from 'react';
import { View, StyleProp, ViewStyle, Text, StyleSheet } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { KunaAsset } from 'kuna-sdk';

import { svgIcons, findIcon } from './svg-icons';
import { coinShadow } from "styles/shadows";
import { Icon } from 'components/icon';

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
    };

    const svgShapeStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
    };

    const existsIcon = findIcon(asset);

    if (!existsIcon) {
        const symbolContainerStyle = {
            width: size,
            height: size,
            fontSize: size * 0.625,
            lineHeight: size,
            textAlign: 'center',
        };

        return (
            <View style={[coinIconStyle, withShadow ? coinShadow : {}, style]}>
                <Icon name="shapeBox" size={size} style={svgShapeStyle} fill={asset.color}/>
                <Text style={[styles.onlySymbolText, symbolContainerStyle]}>
                    {asset.name.charAt(0).toUpperCase()}
                </Text>
            </View>
        );
    }

    const svgShapeIconStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
    };

    return (
        <View style={[coinIconStyle, withShadow ? coinShadow : {}, style]}>
            <Icon name="shapeBox" size={size} style={svgShapeStyle} fill={asset.color}/>
            <SvgIcon svgs={svgIcons}
                     name={asset.key as string}
                     width={size}
                     height={size}
                     fill="#ffffff"
                     style={svgShapeIconStyle}
            />
        </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
    },
});
