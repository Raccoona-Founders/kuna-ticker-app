import React from 'react';
import { inject } from 'mobx-react/native';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import Constants from 'utils/constants';
import { Color } from 'styles/variables';
import FilterCoin from './filter-coin';
import MarketList from './market-list';

type State = {
    refreshing: boolean;
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};

type OuterProps = {};
type MarketTabProps
    = OuterProps
    & mobx.ticker.WithTickerProps;


// @ts-ignore
@inject('Ticker')
export default class MarketTab extends React.Component<MarketTabProps, State> {
    public state: State = {
        refreshing: false,
        favorite: false,
        activeAsset: undefined,
    };

    public render(): JSX.Element {
        return (
            <View style={styles.flatList}>
                <View style={styles.filterTab}>
                    <View style={styles.filterTabContent}>
                        <FilterCoin onChoose={this.__onChooseCoin}
                                    active={this.state.activeAsset}
                        />
                    </View>
                </View>

                <ScrollView
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={this.__renderRefreshControl()}
                >
                    <View style={{ height: 60 }} />
                    <MarketList
                        favorite={this.state.favorite}
                        activeAsset={this.state.activeAsset}
                    />
                    <View style={{ height: Constants.IS_IPHONE_X ? 90 : 60 }} />
                </ScrollView>
            </View>
        );
    }


    private __onChooseCoin = (assetUnit?: KunaAssetUnit) => {
        this.setState({
            activeAsset: assetUnit,
        });
    };


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
    listItemSeparator: {
        borderBottomColor: Color.GrayLight,
        borderBottomWidth: 1,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
    },

    filterTabContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        backgroundColor: Color.White,
        borderRadius: 6,

        overflow: 'hidden',
        width: '100%',
    },

    filterTab: {

        zIndex: 5,
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.07,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 2 },
    },
});
