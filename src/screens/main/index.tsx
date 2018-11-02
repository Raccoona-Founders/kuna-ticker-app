import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { TabView, Scene, SceneRendererProps, PagerScroll } from 'react-native-tab-view';
import { trackScreen } from 'utils/ga-tracker';
import { Layout } from 'components/layout';

import { tabNavigationRoutes, TabnavRoute, QuoteTabItem } from './tab-bar';


import { mainStyles, tabBarStyles } from './styles';
import AboutTab from './about-tab';
import MarketTab  from './market-tab';

type MainScreenState = {
    index: number;
    routes: TabnavRoute[];
};

export class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        index: 0,
        routes: tabNavigationRoutes,
    };

    protected _animation: Animated.Value;

    public constructor(props: MainScreenProps) {
        super(props);

        this._animation = new Animated.Value(0);
    }

    public componentDidMount(): void {
        this.trackScreen();

        this.props.navigation.addListener('willBlur', this.blurComponent);
        this.props.navigation.addListener('willFocus', this.focusComponent);
    }

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
            <Layout>
                <Animated.View
                    pointerEvents="box-none"
                    style={[StyleSheet.absoluteFillObject, {
                        backgroundColor: 'black',
                        opacity: this._animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolateRight: 'clamp',
                        }),
                        zIndex: 1000,
                    }]}
                />

                <View style={{ flex: 1 }}>
                    {this.renderTabBar(props)}
                    <View style={{ height: 60 }} />

                    <PagerScroll {...props} />
                </View>
            </Layout>
        );
    };

    protected renderScene = (props: Scene<TabnavRoute>) => {
        const { assets } = props.route;
        if (assets && assets.length) {
            return <MarketTab assets={assets} />
        }

        return <AboutTab />;
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

    protected blurComponent = () => {
        Animated.timing(
            this._animation,
            {
                toValue: 1,
                duration: 300,
            },
        ).start();
    };

    protected focusComponent = () => {
        Animated.timing(
            this._animation,
            {
                toValue: 0,
                duration: 100,
            },
        ).start();

        this.trackScreen();
    };

    protected trackScreen = () => {
        const { index, routes } = this.state;

        trackScreen(`main/${routes[index].key}`, 'MainScreen');
    };
}

type MainScreenProps = NavigationInjectedProps;
