import React from 'react';
import { createShadeNavigator } from 'components/shade-navigator';

import { KunaAssetUnit } from 'kuna-sdk';
import { MainScreen } from 'screens/main';
import MarketScreen from 'screens/market';
import DepthScreen from 'screens/depth';
import RouteKeys from 'router/route-keys';


/** ============================================================================================================= */

const routeConfigs = {
    [RouteKeys.Main]: {
        screen: MainScreen,
    },

    [RouteKeys.Market]: {
        screen: MarketScreen,
    },

    [RouteKeys.Depth]: {
        screen: DepthScreen,
    },
};


const navigatorConfig = {
    initialRouteName: RouteKeys.Main,
    initialRouteParams: {
        symbol: KunaAssetUnit.UkrainianHryvnia,
    },
};

export const ApplicationRouter = createShadeNavigator(routeConfigs, navigatorConfig);
