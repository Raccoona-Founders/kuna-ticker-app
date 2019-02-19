import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { KunaAssetUnit } from 'kuna-sdk';
import { ShadeScrollCard } from 'components/shade-navigator';
import Topic from 'components/topic';
import SpanText from 'components/span-text';

export type SelectAssetParams = {
    emptyAsset?: boolean;
    assets?: KunaAssetUnit[];
    currentAsset?: KunaAssetUnit;
    onSelect: (newCurrency: KunaAssetUnit | undefined) => void;
};

type SelectAssetProps
    = NavigationScreenProps<SelectAssetParams>;

export default class SelectAssetScreen extends React.PureComponent<SelectAssetProps> {
    public render(): JSX.Element {
        const { navigation } = this.props;
        const assets: Array<KunaAssetUnit | undefined> = navigation.getParam('assets') || [];

        const emptyAsset = navigation.getParam('emptyAsset') || false;
        const rowRenderer = this.__generateRowRenderer();

        return (
            <ShadeScrollCard>
                <Topic title="Choose Coin" />

                <View>
                    {emptyAsset ? rowRenderer(undefined, 0) : undefined}
                    {assets.map(rowRenderer)}
                </View>
            </ShadeScrollCard>
        );
    }


    private __generateRowRenderer() {
        const { navigation } = this.props;
        const currentAsset = navigation.getParam('currentAsset') || undefined;

        return (asset: KunaAssetUnit | undefined, index: number) => {
            return (
                <TouchableOpacity onPress={() => this.__onSelectAsset(asset)} key={index}>
                    <SpanText>{asset ? asset : 'No coin'}</SpanText>

                    {asset === currentAsset ? (<SpanText>SELECTED</SpanText>) : undefined}
                </TouchableOpacity>
            );
        };
    }


    private __onSelectAsset = (asset: KunaAssetUnit | undefined) => {
        const { navigation } = this.props;
        const onSelect = navigation.getParam('onSelect');

        if (onSelect && typeof onSelect === 'function') {
            onSelect(asset);
        }

        navigation.goBack();
    };
}
