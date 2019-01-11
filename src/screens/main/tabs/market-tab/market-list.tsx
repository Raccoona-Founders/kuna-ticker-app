import React from 'react';
import { values, chain } from 'lodash';
import { KunaAssetUnit, KunaMarket, kunaMarketMap } from 'kuna-sdk';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import MarketRow from 'components/market-row';
import { Color } from 'styles/variables';

type State = {};

// @ts-ignore
@withNavigation
@inject('Ticker')
@observer
export default class MarketList extends React.Component<Props, State> {
    public render(): JSX.Element {
        return (
            <FlatList
                data={values(kunaMarketMap)}
                renderItem={this.__marketRowRenderer()}
                initialNumToRender={10}
                keyExtractor={(m: KunaMarket) => m.key}
                scrollEnabled={false}
            />
        );
    }

    private __marketRowRenderer = () => {
        const { Ticker, activeAsset, favorite } = this.props;

        const enabledMarkets = this.__getEnabledMarkets(activeAsset, favorite);

        return (item: ListRenderItemInfo<KunaMarket>) => {
            const market = item.item;

            const currentTicker = Ticker.getTicker(market.key);
            const usdPrice = Ticker.usdCalculator.getPrice(market.key);

            return (
                <MarketRow market={market}
                           ticker={currentTicker}
                           usdPrice={usdPrice}
                           onPress={this.__pressMarketRow(item.item)}
                           visible={enabledMarkets.indexOf(market.key) >= 0}
                />
            );
        };
    };

    private __pressMarketRow = (market: KunaMarket) => {
        return () => {
            this.props.navigation.navigate('Market', { symbol: market.key });
        };
    };

    private __getEnabledMarkets = (activeAsset?: KunaAssetUnit, favorite: boolean = false): string[] => {
        if (!activeAsset) {
            return Object.keys(kunaMarketMap);
        }

        /** @TODO Implement favorite */
        return chain(kunaMarketMap)
            .filter((market: KunaMarket): boolean => [market.quoteAsset, market.baseAsset].indexOf(activeAsset) >= 0)
            .map((market: KunaMarket) => market.key)
            .value();
    };
}

type OuterProps = {
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};
type Props = OuterProps & MobxTicker.WithTickerProps & NavigationInjectedProps;

const styles = StyleSheet.create({
    listItemSeparator: {
        borderBottomColor: Color.GrayLight,
        borderBottomWidth: 1,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
    },
});
