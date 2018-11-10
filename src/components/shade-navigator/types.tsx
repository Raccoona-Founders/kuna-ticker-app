import { NavigationInjectedProps } from 'react-navigation';

export type SceenInjectedProps = NavigationInjectedProps & {
    screenProps: { [key: string]: any };
};
