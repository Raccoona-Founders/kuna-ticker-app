import { StackRouter, createNavigator } from 'react-navigation';
import ShadeView from '../views/shade-view';

const createKeyboardAwareNavigator = require('react-navigation').createKeyboardAwareNavigator;


export function createShadeNavigator(routeConfigMap: any, stackConfig: any = {}) {
    const {
        initialRouteKey,
        initialRouteName,
        initialRouteParams,
        paths,
        navigationOptions,
        disableKeyboardHandling,
        getCustomActionCreators,
    } = stackConfig;

    const stackRouterConfig = {
        initialRouteKey,
        initialRouteName,
        initialRouteParams,
        paths,
        navigationOptions,
        getCustomActionCreators,
    };

    const router = StackRouter(routeConfigMap, stackRouterConfig);

    let Navigator = createNavigator(ShadeView, router, stackConfig);
    if (!disableKeyboardHandling) {
        Navigator = createKeyboardAwareNavigator(Navigator, stackConfig);
    }

    return Navigator;
}
