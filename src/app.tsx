import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as MobxProvider } from 'mobx-react/native';
import SplashScreen from 'react-native-splash-screen';
import 'utils/setup-locale';
import i18n from 'utils/i18n';
import AnalTracker from 'utils/ga-tracker';
import configureRemoteConfig from 'utils/remote-config';
import ApplicationRouter from 'router';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import buildAppStore from 'mobx-store';

type ApplicationState = {
    isReady: boolean;
    mobxStore?: MobxStore;
    error?: Error;
};


export default class Application extends React.PureComponent<any, ApplicationState> {
    public state: ApplicationState = {
        isReady: false,
        mobxStore: undefined,
        error: undefined,
    };

    public async componentWillMount(): Promise<void> {
        this.setState({ isReady: false });

        try {
            const mobxStore = await buildAppStore();
            this.setState({ mobxStore: mobxStore, isReady: true });
            await configureRemoteConfig();

        } catch (error) {
            this.setState({ error: error });
            SplashScreen.hide();

            console.error(error);

            return;
        }

        SplashScreen.hide();

        AnalTracker.setUserProperty('LANGUAGE', i18n.currentLocale());
    }


    public render(): JSX.Element {
        const { mobxStore, isReady, error } = this.state;

        if (error) {
            return (
                <View style={styles.loadingContainer}>
                    <SpanText>Error!</SpanText>
                    <SpanText style={{ textAlign: 'center' }}>{error.message}</SpanText>
                </View>
            );
        }

        if (!isReady && !mobxStore) {
            return <View style={styles.loadingContainer} />;
        }

        return (
            <MobxProvider {...this.state.mobxStore}>
                <ApplicationRouter />
            </MobxProvider>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: Color.GrayWhite,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    loadingText: {
        color: Color.Purple,
    },
});
