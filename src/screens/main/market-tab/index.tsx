import React from 'react';
import { values, chain } from 'lodash';
import { Dispatch } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { KunaAssetUnit, KunaMarket, kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import kunaClient from 'utils/kuna-api';
import MarketRow from 'components/market-row';
import { Ticker } from 'store/actions';
import { TabnavRoute } from 'screens/main/tab-bar';

import TagRow from '../components/tag-row';
import { Color } from 'styles/variables';

type State = {
    refreshing: boolean;
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};

type OuterProps = { route: TabnavRoute; };
type Props = OuterProps & {
    updateTickers: (tickers: KunaV3Ticker[]) => void;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateTickers: (tickers: KunaV3Ticker[]) => dispatch({
            type: Ticker.BulkUpdateTickers,
            tickers: tickers,
        }),
    };
};

// @ts-ignore
@compose<Props, OuterProps>(
    connect(undefined, mapDispatchToProps),
)
export default class MarketTab extends React.PureComponent<Props, State> {
    public state: State = {
        refreshing: false,
        favorite: false,
        activeAsset: undefined,
    };

    public render(): JSX.Element {
        return (
            <View style={styles.flatList}>
                <View>
                    <TagRow onChooseTag={this.__onChooseTag} />
                </View>

                <ScrollView
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={this.__renderRefreshControl()}
                >
                    <FlatList
                        data={this.__getEnabledMarkets()}
                        renderItem={this.__renderMarketRow}
                        initialNumToRender={7}
                        keyExtractor={(m: KunaMarket) => m.key}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
                    />
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

    private __renderMarketRow = (item: ListRenderItemInfo<KunaMarket>) => {
        return <MarketRow market={item.item} />;
    };

    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __getEnabledMarkets = (): KunaMarket[] => {
        const { activeAsset, favorite = false } = this.state;

        if (!activeAsset) {
            return values(kunaMarketMap);
        }

        /** @TODO Implement favorite **/
        return chain(kunaMarketMap)
            .filter((market: KunaMarket): boolean => [market.quoteAsset, market.baseAsset].indexOf(activeAsset) >= 0)
            .value();
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        try {
            const tickers = await kunaClient.getTickers();
            this.props.updateTickers(tickers);
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