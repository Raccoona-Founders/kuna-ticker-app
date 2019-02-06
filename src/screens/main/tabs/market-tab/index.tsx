import React from 'react';
import { inject } from 'mobx-react/native';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import { Color } from 'styles/variables';

import TagRow from '../../components/tag-row';
import MarketList from './market-list';


type State = {
    refreshing: boolean;
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};

type OuterProps = {};
type Props = OuterProps & mobx.ticker.WithTickerProps;

// @ts-ignore
@inject('Ticker')
export default class MarketTab extends React.Component<Props, State> {
    public state: State = {
        refreshing: false,
        favorite: false,
        activeAsset: undefined,
    };


    public render(): JSX.Element {
        // @ts-ignore
        const marketList = <MarketList
            favorite={this.state.favorite}
            activeAsset={this.state.activeAsset}
        />;

        return (
            <View style={styles.flatList}>
                <TagRow onChooseTag={this.__onChooseTag} />
                <ScrollView
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={this.__renderRefreshControl()}
                >
                    {marketList}
                </ScrollView>
            </View>
        );
    }


    private __onChooseTag = (index?: number, assetUnit?: KunaAssetUnit) => {
        const setMode: Partial<State> = {
            activeAsset: undefined,
            favorite: false,
        };

        if (typeof index !== 'undefined') {
            if (assetUnit) {
                setMode.activeAsset = assetUnit;
            } else {
                setMode.favorite = true;
            }
        }

        this.setState(setMode as State);
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
});
