import React from 'react';
import { map, filter } from 'lodash';
import { ScrollView, View, Animated } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { TabView, Scene, SceneRendererProps, PagerPan, PagerScroll } from 'react-native-tab-view';
import { kunaMarketMap, KunaMarket, KunaAssetUnit, getAsset } from 'kuna-sdk';
import { trackScreen } from 'utils/ga-tracker';
import { Layout } from 'components/layout';

import { quoteAssets, AssetRoute, QuoteTabItem } from './tab-bar';
import { MarketRow } from './market-row';
import { mainStyles, tabBarStyles } from './styles';
import { styles } from 'screens/market/styles';

type MainScreenState = {
    index: number;
    routes: AssetRoute[];
};

export class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        index: 0,
        routes: quoteAssets,
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

    protected get currentSymbol(): KunaAssetUnit {
        const { index, routes } = this.state;

        return routes[index].key || KunaAssetUnit.UkrainianHryvnia;
    }

    protected onChangeIndex = (index: number) => {
        this.setState({ index: index }, this.trackScreen);
    };

    protected renderPager = (props: SceneRendererProps<AssetRoute>) => {
        return (
            <Layout>

                <Animated.View
                    pointerEvents="box-none"
                    style={[styles.panelContainer, {
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

    protected renderScene = (props: Scene<AssetRoute>) => {
        const actualMarketMap = this.getMarketMap(props.route);

        return (
            <ScrollView style={mainStyles.flatList} showsVerticalScrollIndicator={false}>
                {map(actualMarketMap, (market: KunaMarket) => (
                    <MarketRow market={market} key={market.key} />
                ))}
            </ScrollView>
        );
    };

    protected renderTabBar = (props: SceneRendererProps<AssetRoute>) => {
        const { navigationState } = props;

        const inputRange = navigationState.routes.map((x, i) => i);

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
                    {navigationState.routes.map((route: AssetRoute, i: number) => (
                        <QuoteTabItem
                            interpolate={interpolate(i)}
                            key={route.key}
                            isActive={navigationState.index === i}
                            asset={getAsset(route.key)}
                            onPress={() => this.setState({ index: i })}
                        />
                    ))}
                </View>
            </View>
        );
    };

    protected getMarketMap = (route: AssetRoute): KunaMarket[] => {
        return filter(kunaMarketMap, { quoteAsset: route.key });
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
        trackScreen(`main/${this.currentSymbol}`, 'MainScreen');
    };
}

type MainScreenProps = NavigationInjectedProps;
