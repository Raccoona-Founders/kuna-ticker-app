import React from 'react';
import { Store } from 'redux';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { kunaApiClient } from 'kuna-sdk';
import SplashScreen from 'react-native-splash-screen';

import 'utils/setup-locale';

import { ApplicationRouter } from 'router';
import { initStore } from 'store';
import { Ticker } from 'store/actions';
import { Color } from 'styles/variables';
import { getUahRate } from 'utils/external';

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
        this.setState({ isStoreLoading: true });

        const store = await initStore();

        this.setState({
            isStoreLoading: false,
            store: store,
        });

        SplashScreen.hide();

        try {
            await this.updateTickers();

            setInterval(this.updateTickers, 10 * 60 * 1000);
        } catch (error) {

        }

        try {
            await this.updateUsdRate();

            setInterval(this.updateUsdRate, 4 * 60 * 60 * 1000);
        } catch (error) {

        }
    }

    public render(): JSX.Element {
        const { store, isStoreLoading } = this.state;

        if (!store || isStoreLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            );
        }

        return (
            <Provider store={store}>
                <ApplicationRouter />
            </Provider>
        );
    }


    protected updateTickers = async (): Promise<void> => {
        const { store } = this.state;

        if (!store) {
            return;
        }

        const tickers = await kunaApiClient.getTickers();
        store.dispatch({
            type: Ticker.BulkUpdateTickers,
            tickers: tickers,
        });
    };

    protected updateUsdRate = async (): Promise<void> => {
        const { store } = this.state;

        if (!store) {
            return;
        }

        const rate = await getUahRate();

        store.dispatch({
            type: Ticker.UpdateUSDRate,
            rate: rate,
        });
    };
}

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: Color.Gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Color.Purple,
    },
});
