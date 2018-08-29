import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { MainScreen } from 'screens/main';
import { MarketScreen } from 'screens/market';
import { Color } from 'styles/variables';
import { KunaAssetUnit } from 'kuna-sdk';

const RootStack = createStackNavigator(
    {
        Main: {screen: MainScreen},
        Market: {screen: MarketScreen},
    }, {
        initialRouteName: 'Main',
        initialRouteParams: {
            symbol: KunaAssetUnit.UkrainianHryvnia,
        },
        headerMode: 'none',
        cardStyle: {
            shadowOpacity: 0,
            margin: 0,
            backgroundColor: Color.Background,
        },
    },
);

export class ApplicationRouter extends React.PureComponent {
    public render(): JSX.Element {
        return (
            <SafeAreaView style={styles.safeArea}>
                <RootStack/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Color.Background,
    },
});
