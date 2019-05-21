import { StackRouter, createNavigator, NavigationAction, NavigationState } from 'react-navigation';
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

    const defaultGetStateForAction = router.getStateForAction;

    router.getStateForAction = (action: NavigationAction, lastState?: NavigationState): NavigationState | null => {
        const lastRoute = lastState && lastState.routes[lastState.routes.length - 1];
        if (action.type === 'Navigation/PUSH' && lastRoute && action.routeName === lastRoute.routeName) {
            return null;
        }

        return defaultGetStateForAction(action, lastState);
    };

    // @ts-ignore
    let Navigator = createNavigator(ShadeView, router, stackConfig);
    if (!disableKeyboardHandling) {
        Navigator = createKeyboardAwareNavigator(Navigator, stackConfig);
    }

    return Navigator;
}