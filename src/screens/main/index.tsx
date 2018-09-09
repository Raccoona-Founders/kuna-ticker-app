import React from 'react';
import { map, filter } from 'lodash';
import { ScrollView, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { TabView, Scene, SceneRendererProps, PagerPan } from 'react-native-tab-view';
import { kunaMarketMap, KunaMarket, KunaAssetUnit, getAsset } from 'kuna-sdk';
import { tracker } from 'utils/ga-tracker';
import { Layout } from 'components/layout';

import { quoteAssets, AssetRoute, QuoteTabItem } from './tab-bar';
import { MarketRow } from './market-row';
// import { InfoBar } from './info-bar';
import { mainStyles, tabBarStyles } from './styles';

type MainScreenState = {
    index: number;
    routes: AssetRoute[];
};

export class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        index: 0,
        routes: quoteAssets,
    };

    public componentDidMount(): void {
        tracker.trackScreenView(`main/${this.currentSymbol}`);
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
        return this.props.navigation.getParam('symbol', KunaAssetUnit.UkrainianHryvnia);
    }

    protected onChangeIndex = (index: number) => {
        this.setState({index: index});
    };

    protected renderPager = (props: SceneRendererProps<AssetRoute>) => {
        return (
            <Layout>
                {this.renderTabBar(props)}

                <PagerPan {...props} />
            </Layout>
        );
    };

    protected renderScene = (props: Scene<AssetRoute>) => {
        const actualMarketMap = this.getMarketMap(props.route);

        return (
            <ScrollView style={mainStyles.flatList}>
                {map(actualMarketMap, (market: KunaMarket) => (
                    <MarketRow market={market} key={market.key}/>
                ))}
            </ScrollView>
        );
    };

    protected renderTabBar = (props: SceneRendererProps<AssetRoute>) => {
        const {navigationState} = props;

        const inputRange = navigationState.routes.map((x, i) => i);

        const interpolate = (index: number) => {
            return (active: any, inactive: any) => {
                return props.position.interpolate({
                    inputRange: inputRange,
                    outputRange: inputRange.map(
                        inputIndex => (inputIndex === index ? active : inactive),
                    ),
                });
            }
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
                            onPress={() => this.setState({index: i})}
                        />
                    ))}
                </View>
            </View>
        );
    };

    protected getMarketMap = (route: AssetRoute): KunaMarket[] => {
        return filter(kunaMarketMap, {quoteAsset: route.key});
    }
}

type MainScreenProps = NavigationInjectedProps;
