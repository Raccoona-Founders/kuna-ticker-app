import React from 'react';
import { KunaAssetUnit } from 'kuna-sdk';
import { createStackNavigator, NavigationTransitionProps, TransitionConfig } from 'react-navigation';
import { MainScreen } from 'screens/main';
import { MarketScreen } from 'screens/market';
import { Color } from 'styles/variables';

export const ApplicationRouter = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: {
                style: {
                    padding: 20,
                },
            },
        },
        Market: { screen: MarketScreen },
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
            backgroundColor: 'transparent',
            opacity: 1,
        },
    },
);