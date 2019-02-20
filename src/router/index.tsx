import React from 'react';
import { createShadeNavigator } from 'components/shade-navigator';
import MainScreen from 'screens/main';
import MarketScreen from 'screens/market';
import OrderBookScreen from 'screens/order-book';
import CalculatorScreen from 'screens/calculator';
import KunaCode from 'screens/kuna-code';
import Settings from 'screens/settings';
import Service from 'screens/service';
import RouteKeys from 'router/route-keys';


/** ============================================================================================================= */

const routeConfigs = {
    [RouteKeys.Main]: { screen: MainScreen },

    [RouteKeys.Market]: { screen: MarketScreen },
    [RouteKeys.Market_OrderBook]: { screen: OrderBookScreen },
    [RouteKeys.Market_Calculator]: { screen: CalculatorScreen },

    [RouteKeys.Setting_About]: { screen: Settings.AboutScreen },
    [RouteKeys.Setting_KunaCode]: { screen: Settings.KunaCodeScreen },

    [RouteKeys.KunaCode_ViewOffer]: { screen: KunaCode.ViewOfferScreen },
    [RouteKeys.KunaCode_CreateOffer]: { screen: KunaCode.CreateOfferScreen },

    [RouteKeys.Service_EnterText]: { screen: Service.EnterTextScreen },
    [RouteKeys.Service_SelectAsset]: { screen: Service.SelectAssetScreen },
};


const navigatorConfig = {
    initialRouteName: RouteKeys.Main,
};

const ApplicationRouter = createShadeNavigator(routeConfigs, navigatorConfig);
export default ApplicationRouter;
