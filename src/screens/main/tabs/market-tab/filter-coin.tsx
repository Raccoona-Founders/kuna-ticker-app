import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import Icon from 'react-native-vector-icons/FontAwesome5';

const assets: string[] = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.Tether,
    KunaAssetUnit.AdvancedUSD,
    KunaAssetUnit.AdvancedRUB,
];

type FilterAssetsProps = {
    active?: KunaAssetUnit;
    onChoose: (assetUnit?: KunaAssetUnit) => void;
};

export default class FilterCoin extends React.PureComponent<FilterAssetsProps> {
    public render(): JSX.Element {
        return (
            <TouchableOpacity onPress={this.__pressFilter}>
                <View style={styles.box}>
                    <SpanText style={{ fontSize: 16 }}>
                        {this.props.active ? this.props.active : 'Filter by coin'}
                    </SpanText>

                    <Icon name="caret-down" style={styles.icon} />
                </View>
            </TouchableOpacity>
        );
    }

    protected __pressFilter = () => {

    };
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',

        borderStyle: 'solid',
        borderBottomColor: Color.GrayBlues,
        borderBottomWidth: 1,
        paddingBottom: 2
    },

    icon: {
        marginLeft: 5,
    }
});
