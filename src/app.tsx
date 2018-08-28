import React from 'react';
import { Store } from 'redux';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { kunaApiClient, KunaTicker } from 'kuna-sdk';

import SplashScreen from 'react-native-splash-screen';

import { ApplicationRouter } from 'router';
import { initStore } from 'store';
import { Ticker } from 'store/actions'
import { Color } from 'styles/variables';

type ApplicationState = {
    isStoreLoading: boolean;
    store?: Store<KunaStore>;
};

export class Application extends React.PureComponent<any, ApplicationState> {
    public state: ApplicationState = {
        isStoreLoading: false,
        store: undefined,
    };

    public async componentWillMount(): Promise<void> {
        this.setState({isStoreLoading: true});

        const store = await initStore();

        this.setState({
            isStoreLoading: false,
            store: store
        });

        await this.updateTickers();

        setTimeout(this.updateTickers, 10 * 60 * 1000);
    }

    public render(): JSX.Element {
        const {store, isStoreLoading} = this.state;

        if (!store || isStoreLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            );
        }

        SplashScreen.hide();

        return (
            <Provider store={store}>
                <ApplicationRouter/>
            </Provider>
        );
    }


    protected updateTickers = async (): Promise<void> => {

        const {store} = this.state;

        if (!store) {
            return;
        }

        const tickers = await kunaApiClient.getTickers();
        tickers.map((ticker: KunaTicker) => {
            store.dispatch({
                type: Ticker.UpdateTicker,
                marketSymbol: ticker.pair,
                ticker: ticker,
            });
        });
    };
}

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: Color.Background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Color.Primary
    }
});

StyleSheet.
