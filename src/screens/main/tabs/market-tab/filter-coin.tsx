import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { compose } from 'recompose';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { getAsset, KunaAssetUnit } from 'kuna-sdk';
import SpanText from 'components/span-text';
import { SelectAssetParams } from 'screens/service/select-asset';
import { Color } from 'styles/variables';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RouteKeys from 'router/route-keys';
import { CoinIcon } from 'components/coin-icon';

const assets: string[] = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.Tether,
    KunaAssetUnit.USDollar,
    KunaAssetUnit.RussianRuble,
];

class FilterCoin extends React.PureComponent<FilterAssetsProps> {
    public render(): JSX.Element {
        const asset = this.props.active ? getAsset(this.props.active) : undefined;

        return (
            <TouchableOpacity onPress={this.__pressFilter}>
                <View style={styles.box}>
                    {asset ? (
                        <CoinIcon asset={asset}
                                  size={28}
                                  withShadow={false}
                                  naked={true}
                                  style={{ marginRight: 0, marginLeft: -8 }}
                        />
                    ) : (
                        <Icon name="filter" style={{ marginRight: 5, fontSize: 10 }} />
                    )}
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

        paddingLeft: 10,
        paddingRight: 10,
        height: 44,
    },

    icon: {
        marginLeft: 5,
        color: Color.PurpleNoactive,
    },
});
