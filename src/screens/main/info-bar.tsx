import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { View } from 'react-native';
import { KunaAssetUnit, KunaMarket, KunaV3Ticker } from 'kuna-sdk';

import { tabBarStyles } from './styles';
import { SpanText } from 'components/span-text';

const InfoBarComponent = (props: InfoBarProps) => {
    const { asset } = props;

    return (
        <View style={tabBarStyles.infoBar}>
            <SpanText>Volume 24h ({asset})</SpanText>
        </View>
    );
};

type InfoBarOuterProps = {
    markets: KunaMarket[];
    asset: KunaAssetUnit;
};

type ConnectedProps = {
    tickers: Record<string, KunaV3Ticker>;
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
