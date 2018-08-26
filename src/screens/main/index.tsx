import React from 'react';
import { compose } from 'recompose';
import { map, find } from 'lodash';
import { connect } from 'react-redux'
import { ScrollView, View, Text } from 'react-native';
import { kunaMarketMap, KunaMarket, KunaTicker } from 'kuna-sdk';

import { tracker } from 'utils/ga-tracker';
import { Topic } from 'components/topic';

import { MarketRow } from './market-row';
import { styles } from './styles';

type MainScreenState = {
    tickers: KunaTicker[];
};

class MainScreenComponent extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        tickers: [],
    };

    public async componentDidMount(): Promise<void> {
        tracker.trackScreenView('home');
    }

    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Topic title={<Text>Kuna Markets</Text>}/>
                <ScrollView style={styles.flatList}>
                    {map(kunaMarketMap, (market: KunaMarket) => {
                        return <MarketRow market={market} ticker={this.findTicker(market)} key={market.key}/>;
                    })}
                </ScrollView>
            </View>
        );
    }

    protected findTicker(market: KunaMarket): KunaTicker | undefined {
        return find(this.props.tickers, {pair: market.key});
    }
}

type MainScreenOuterProps = {};
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
