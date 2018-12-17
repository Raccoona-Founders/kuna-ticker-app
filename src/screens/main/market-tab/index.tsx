import React from 'react';
import { filter, map } from 'lodash';
import { Dispatch } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { KunaAssetUnit, KunaMarket, kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import MarketRow from 'components/market-row';
import { Ticker } from 'store/actions';
import { TabnavRoute } from 'screens/main/tab-bar';
import kunaClient from 'utils/kuna-api';


type State = {
    refreshing: boolean;
};


class MarketTab extends React.PureComponent<Props, State> {
    public state: State = {
        refreshing: false,
    };

    public render(): JSX.Element {
        const { assets = [] } = this.props.route;

        const actualMarketMap = this.getMarketMap(assets);

        return (
            <ScrollView
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                refreshControl={this._renderRefreshControl()}
            >
                {map(actualMarketMap, (market: KunaMarket, index: number) => (
                    <MarketRow key={market.key} market={market} index={index} />
                ))}
            </ScrollView>
        );
    }

    protected _renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
        );
    };

    protected getMarketMap = (assets: KunaAssetUnit[]): KunaMarket[] => {
        return filter(kunaMarketMap, (market: KunaMarket): boolean => {
            return assets.indexOf(market.quoteAsset) >= 0;
        });
    };

    protected _onRefresh = async () => {
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


type OuterProps = {
    route: TabnavRoute;
};

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

export default compose<Props, OuterProps>(
    connect(undefined, mapDispatchToProps),
)(MarketTab);

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});