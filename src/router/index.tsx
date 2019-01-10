import React from 'react';
import { createShadeNavigator } from 'components/shade-navigator';

import { KunaAssetUnit } from 'kuna-sdk';
import MainScreen from 'screens/main';
import MarketScreen from 'screens/market';
import OrderBookScreen from 'screens/order-book';
import CalculatorScreen from 'screens/calculator';
import RouteKeys from 'router/route-keys';


/** ============================================================================================================= */

const routeConfigs = {
    [RouteKeys.Main]: { screen: MainScreen },

    [RouteKeys.Market]: { screen: MarketScreen },
    [RouteKeys.Market_OrderBook]: { screen: OrderBookScreen },
    [RouteKeys.Market_Calculator]: { screen: CalculatorScreen },
};


const navigatorConfig = {
    initialRouteName: RouteKeys.Main,
    initialRouteParams: {
        symbol: KunaAssetUnit.UkrainianHryvnia,
    },
};

const ApplicationRouter = createShadeNavigator(routeConfigs, navigatorConfig);
export default ApplicationRouter;
