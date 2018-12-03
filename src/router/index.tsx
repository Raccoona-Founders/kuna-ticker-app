import React from 'react';
import { createShadeNavigator } from 'components/shade-navigator';

import { KunaAssetUnit } from 'kuna-sdk';
import { MainScreen } from 'screens/main';
import MarketScreen from 'screens/market';
import OrderBookScreen from 'screens/order-book';
import RouteKeys from 'router/route-keys';
import { RiddleQuestionScreen } from 'screens/riddle-question';


/** ============================================================================================================= */

const routeConfigs = {
    [RouteKeys.Main]: {
        screen: MainScreen,
    },

    [RouteKeys.Market]: {
        screen: MarketScreen,
    },

    [RouteKeys.OrderBook]: {
        screen: OrderBookScreen,
    },


    [RouteKeys.RiddleQuestion]: {
        screen: RiddleQuestionScreen,
    },
    [RouteKeys.RiddleAnswer]: {
        screen: RiddleQuestionScreen,
    },
};


const navigatorConfig = {
    initialRouteName: RouteKeys.Main,
    initialRouteParams: {
        symbol: KunaAssetUnit.UkrainianHryvnia,
    },
};

export const ApplicationRouter = createShadeNavigator(routeConfigs, navigatorConfig);
