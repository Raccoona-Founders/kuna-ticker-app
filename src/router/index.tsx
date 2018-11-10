import React from 'react';
import { createShadeNavigator } from 'components/shade-navigator';

import { KunaAssetUnit } from 'kuna-sdk';
import { MainScreen } from 'screens/main';
import { MarketScreen } from 'screens/market';
import RouteKeys from 'router/route-keys';


/** ============================================================================================================= */
export const ApplicationRouter = createShadeNavigator(
    {
        [RouteKeys.Main]: {
            screen: MainScreen,
            navigationOptions: {
                style: {
                    padding: 20,
                },
            },
        },
        [RouteKeys.Market]: { screen: MarketScreen },
    }, {
        initialRouteName: RouteKeys.Main,
        initialRouteParams: {
            symbol: KunaAssetUnit.UkrainianHryvnia,
        },
    },
);
