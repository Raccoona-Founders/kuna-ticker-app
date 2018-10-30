import React from 'react';
import { Animated, Easing, Keyboard } from 'react-native';
import {
    createStackNavigator,
    NavigationScreenConfigProps,
    NavigationScreenOptions,
    TransitionConfig,
} from 'react-navigation';
import { KunaAssetUnit } from 'kuna-sdk';
import { MainScreen } from 'screens/main';
import { MarketScreen } from 'screens/market';


/** ============================================================================================================= */


const navigationOptions = (options: NavigationScreenConfigProps): NavigationScreenOptions => {
    return {
        gestureResponseDistance: {
            vertical: 600,
        },
    };
};


/** ============================================================================================================= */


const SceneTransition = (index: number, position: Animated.Value, height: number) => {
    if (index === 0) {
        return;
    }

    const transitionHeight = position.interpolate({
        inputRange: [index - 1, index, index + 1, index + 2],
        outputRange: [height, 0, -22, 0],
    });

    const transitionScale = position.interpolate({
        inputRange: [index - 1, index, index + 1, index + 2],
        outputRange: [1, 1, 0.95, 0.95],
    });

    return {
        transform: [{
            translateY: transitionHeight,
        }, {
            scale: transitionScale,
        }],
    };
};


const transitionConfig = (): TransitionConfig => {
    return {
        transitionSpec: {
            duration: 250,
            easing: Easing.out(Easing.poly(2)),
        },
        screenInterpolator: (sceneProps: any) => {
            const position = sceneProps.position;
            const scene = sceneProps.scene;
            const index = scene.index;
            const height = sceneProps.layout.initHeight;

            return SceneTransition(index, position, height);
        },
        containerStyle: {
            backgroundColor: 'transparent',
        },
    };
};

export const ApplicationRouter = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: {
                style: {
                    padding: 20,
                },
            },
        },
        Market: { screen: MarketScreen },
    }, {
        mode: 'modal',
        headerMode: 'none',
        initialRouteName: 'Main',
        initialRouteParams: {
            symbol: KunaAssetUnit.UkrainianHryvnia,
        },

        transitionConfig: transitionConfig,
        navigationOptions: navigationOptions,
        cardStyle: {
            backgroundColor: 'transparent',
            shadowRadius: 0,
            shadowOpacity: 0,
        },
    },
);