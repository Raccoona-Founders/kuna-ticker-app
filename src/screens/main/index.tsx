import React from 'react';
import { map, filter } from 'lodash';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { TabView, Scene, SceneRendererProps } from 'react-native-tab-view';
import { kunaMarketMap, KunaMarket, KunaAssetUnit } from 'kuna-sdk';
import { tracker } from 'utils/ga-tracker';

import { quoteAssets, AssetTab } from './quote-assets-tab';
import { MarketRow } from './market-row';
import { mainStyles, tabBarStyles } from './styles';

type MainScreenState = {
    index: number;
    routes: any[];
};

export class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        index: 0,
        routes: quoteAssets,
    };

    public componentDidMount() {
        tracker.trackScreenView(`main/${this.currentSymbol}`);
    }

    public render(): JSX.Element {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                style={mainStyles.container}
                onIndexChange={this.onChangeIndex}
            />
        );
    }

    protected get currentSymbol(): KunaAssetUnit {
        return this.props.navigation.getParam('symbol', KunaAssetUnit.UkrainianHryvnia);
    }

    protected onChangeIndex = (index: number) => {
        console.log('onChangeIndex', index);
        this.setState({index: index});
    };

    protected renderScene = (props: Scene<AssetTab>) => {
        const {route} = props;

        const actualMarketMap = filter(kunaMarketMap, {quoteAsset: route.key});

        return (
            <ScrollView style={mainStyles.flatList}>
                {map(actualMarketMap, (market: KunaMarket) => (
                    <MarketRow market={market} key={market.key}/>
                ))}
            </ScrollView>
        );
    };

    protected renderTabBar = (props: SceneRendererProps<AssetTab>) => {
        const {navigationState} = props;

        return (
            <View style={tabBarStyles.container}>
                {navigationState.routes.map((route: AssetTab, i: number) => {

                    const isActive = props.navigationState.index === i;

                    return (
                        <TouchableOpacity
                            style={[tabBarStyles.link, isActive ? tabBarStyles.linkActive : {}]}
                            onPress={() => this.setState({index: i})}
                            key={i}
                        >
                            <Text style={[tabBarStyles.text, isActive ? tabBarStyles.textActive : {}]}>
                                {route.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    };
}

type MainScreenProps = NavigationInjectedProps;
