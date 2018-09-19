import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { MainScreen } from 'screens/main';
import { MarketScreen } from 'screens/market';
// import { Color } from 'styles/variables';
import { KunaAssetUnit } from 'kuna-sdk';

export const ApplicationRouter = createStackNavigator(
    {
        Main: {screen: MainScreen},
        Market: {screen: MarketScreen},
    }, {
        initialRouteName: 'Main',
        initialRouteParams: {
            symbol: KunaAssetUnit.UkrainianHryvnia,
        },
        mode: 'modal',
        headerMode: 'none',
        cardStyle: {
            shadowOpacity: 0,
            margin: 0,
            backgroundColor: '#FFFFFF00',
        },
    },
);

