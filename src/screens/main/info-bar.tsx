import React from 'react';
import Numeral from 'numeral';
import { filter, sum } from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Text, View } from 'react-native';
import { KunaAssetUnit, KunaMarket, KunaTicker } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';

import { tabBarStyles } from './styles';

const InfoBarComponent = (props: InfoBarProps) => {
    const {markets, tickers, asset} = props;

    return (
        <View style={tabBarStyles.infoBar}>
            <Text>Volume 24h  ({asset})</Text>
        </View>
    );
};

type InfoBarOuterProps = {
    markets: KunaMarket[];
    asset: KunaAssetUnit;
};

type ConnectedProps = {
    tickers: Record<string, KunaTicker>;
};

type InfoBarProps = NavigationInjectedProps & InfoBarOuterProps & ConnectedProps;

const mapStateToProps = (store: KunaStore): ConnectedProps => {
    return {
        tickers: store.ticker.tickers,
    };
};

export const InfoBar = compose<InfoBarProps, InfoBarOuterProps>(
    connect(mapStateToProps),
    withNavigation,
)(InfoBarComponent);
