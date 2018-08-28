import React from 'react';
import { compose } from 'recompose';
import { RouteComponentProps } from 'react-router-native';
import { map, find, filter } from 'lodash';
import { connect } from 'react-redux'
import { ScrollView, View, Text } from 'react-native';
import { kunaMarketMap, KunaMarket, KunaTicker, KunaAssetUnit } from 'kuna-sdk';

import { tracker } from 'utils/ga-tracker';
import { Topic, topicStyles } from 'components/topic';

import { QuoteAssetsTab } from './quote-assets-tab';
import { MarketRow } from './market-row';
import { mainStyles } from './styles';

type MainScreenState = {
    tickers: KunaTicker[];
};

class MainScreenComponent extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        tickers: [],
    };

    public async componentDidMount(): Promise<void> {
        const {symbol} = this.props.match.params;

        tracker.trackScreenView(`main/${symbol}`);
    }

    public render(): JSX.Element {
        const {symbol} = this.props.match.params;

        const actualMarketMap = filter(kunaMarketMap, {quoteAsset: symbol});

        return (
            <View style={mainStyles.container}>
                <Topic title={<Text style={topicStyles.titleText}>Kuna Markets</Text>}/>
                <QuoteAssetsTab currentSymbol={symbol}/>
                <ScrollView style={mainStyles.flatList}>
                    {map(actualMarketMap, (market: KunaMarket) => (
                        <MarketRow market={market} ticker={this.findTicker(market)} key={market.key}/>
                    ))}
                </ScrollView>
            </View>
        );
    }

    protected findTicker(market: KunaMarket): KunaTicker | undefined {
        return find(this.props.tickers, {market: market.key});
    }
}

type MainScreenOuterProps = RouteComponentProps<{ symbol: KunaAssetUnit }> & {};
type ConnectedProps = {
    tickers: Record<string, KunaTicker>;
}

type MainScreenProps = ConnectedProps & MainScreenOuterProps;

const mapStateToProps = (store: KunaStore): ConnectedProps => {
    return {
        tickers: store.ticker.tickers,
    };
};

export const MainScreen = compose<MainScreenProps, MainScreenOuterProps>(
    connect(mapStateToProps),
)(MainScreenComponent);
