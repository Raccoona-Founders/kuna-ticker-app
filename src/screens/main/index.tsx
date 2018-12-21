import React from 'react';

import { View, Animated } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { TabView, Scene, SceneRendererProps, PagerScroll } from 'react-native-tab-view';
import Analitics from 'utils/ga-tracker';
import { tabNavigationRoutes, TabnavRoute, QuoteTabItem } from './tab-bar';
import { mainStyles, tabBarStyles } from './styles';

import Constants from 'utils/constants';

type MainScreenState = {
    index: number;
    routes: TabnavRoute[];
};

export default class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        index: 0,
        routes: tabNavigationRoutes,
    };

    public render(): JSX.Element {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                renderTabBar={() => undefined}
                renderPager={this.renderPager}
                style={mainStyles.container}
                onIndexChange={this.onChangeIndex}
            />
        );
    }

    protected onChangeIndex = (index: number) => {
        this.setState({ index: index }, this.trackScreen);
    };

    protected renderPager = (props: SceneRendererProps<TabnavRoute>) => {
        return (
            <>
                {this.renderTabBar(props)}
                <View style={{ height: Constants.IS_IPHONE_X ? 100 : 80 }} />

                <PagerScroll {...props} />
            </>
        );
    };

    protected renderScene = (props: SceneRendererProps<TabnavRoute> & Scene<TabnavRoute>) => {
        const { sceneComponent, index } = props.route;
        const { position } = props;

        const scale = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.9, 1, 0.9],
        });

        return (
            <Animated.View style={{ flex: 1, transform: [{ scale: scale }] }}>
                {React.createElement(sceneComponent, {
                    route: props.route,
                })}
            </Animated.View>
        );
    };

    protected renderTabBar = (props: SceneRendererProps<TabnavRoute>) => {
        const { navigationState } = props;

        const interpolate = (index: number) => {
            return (active: any, inactive: any) => {
                return props.position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [inactive, active, inactive],
                    extrapolate: 'clamp',
                });
            };
        };

        return (
            <View style={tabBarStyles.container}>
                <View style={tabBarStyles.tabBar}>
                    {navigationState.routes.map((route: TabnavRoute, i: number) => (
                        <QuoteTabItem
                            key={route.key}
                            route={route}
                            interpolate={interpolate(i)}
                            isActive={navigationState.index === i}
                            onPress={() => this.setState({ index: i })}
                        />
                    ))}
                </View>
            </View>
        );
    };

    protected trackScreen = () => {
        const { index, routes } = this.state;

        Analitics.trackScreen(`main/${routes[index].key}`, 'MainScreen');
    };
}

type MainScreenProps = NavigationInjectedProps;
