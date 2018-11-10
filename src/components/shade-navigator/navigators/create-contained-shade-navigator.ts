import { createNavigationContainer } from 'react-navigation';
import { createShadeNavigator } from './create-shade-navigator';

export const createContainedShadeNavigator = (routeConfigs: any, config: any = {}) => {
    const navigator = createShadeNavigator(routeConfigs, config);

    return createNavigationContainer(navigator);
};
