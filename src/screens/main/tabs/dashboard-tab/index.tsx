import React from 'react';
import { inject, observer } from 'mobx-react/native';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import { Color } from 'styles/variables';

import VolumeCard from './components/volume-card';
import FavoriteTickers from './components/favorite-tickers';
import Constants from 'utils/constants';


type State = {
    refreshing: boolean;
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};

type OuterProps = {};
type Props
    = OuterProps
    & mobx.ticker.WithTickerProps;

// @ts-ignore
@inject('Ticker')
@observer
export default class MarketTab extends React.Component<Props, State> {
    public state: State = {
        refreshing: false,
        favorite: false,
        activeAsset: undefined,
    };


    public render(): JSX.Element {
        const { Ticker } = this.props;

        const volumeUSD = Ticker.getMarketVolume();
        const BTCUSD = Ticker.usdCalculator.getPrice('btcuah');

        return (
            <ScrollView
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                refreshControl={this.__renderRefreshControl()}
            >
                <VolumeCard
                    volumeUSD={volumeUSD.value()}
                    volumeBTC={volumeUSD.divide(BTCUSD.value()).value()}
                />

                <FavoriteTickers
                    tickers={Ticker.getFavorite()}
                    usdCalculator={Ticker.usdCalculator}
                />

                <View style={{ height: Constants.IS_IPHONE_X ? 90 : 60 }} />
            </ScrollView>
        );
    }

    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('update_markets');

        try {
            await this.props.Ticker.fetchTickers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});
