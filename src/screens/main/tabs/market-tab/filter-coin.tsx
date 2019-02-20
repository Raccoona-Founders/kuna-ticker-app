import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { compose } from 'recompose';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { KunaAssetUnit } from 'kuna-sdk';
import SpanText from 'components/span-text';
import { SelectAssetParams } from 'screens/service/select-asset';
import { Color } from 'styles/variables';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RouteKeys from 'router/route-keys';

const assets: string[] = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.Tether,
    KunaAssetUnit.AdvancedUSD,
    KunaAssetUnit.AdvancedRUB,
];

class FilterCoin extends React.PureComponent<FilterAssetsProps> {
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
        this.props.navigation.push(RouteKeys.Service_SelectAsset, {
            emptyAsset: true,
            currentAsset: this.props.active,
            assets: assets,
            onSelect: this.props.onChoose,
        } as SelectAssetParams);
    };
}

type OuterProps = {
    active?: KunaAssetUnit;
    onChoose: (assetUnit?: KunaAssetUnit) => void;
};

type FilterAssetsProps
    = NavigationInjectedProps
    & OuterProps;

export default compose<FilterAssetsProps, OuterProps>(withNavigation)(FilterCoin);

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 3,
        backgroundColor: Color.GrayLight,
    },

    icon: {
        marginLeft: 5,
        color: Color.PurpleNoactive,
    },
});
