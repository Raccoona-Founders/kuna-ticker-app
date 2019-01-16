import { NavigationState } from 'react-navigation';
import analitics from 'utils/ga-tracker';

// gets the current screen from navigation state
export function getActiveRouteName(navigationState: NavigationState): null | string {
    if (!navigationState) {
        return null;
    }

    const route = navigationState.routes[navigationState.index];

    return route.routeName || null;
}


export function onNavigationStateChange() {
    return (prevState: NavigationState, currentState: NavigationState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);

        if (prevScreen !== currentScreen) {
            analitics.trackScreen(`${currentScreen}`);
        }
    };
}
