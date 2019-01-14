import React from 'react';
import { Animated, Dimensions, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import * as SlideView from 'components/slide-view';
import { tabBarStyles } from '../styles';
import { Color } from 'styles/variables';
import { _ } from 'utils/i18n';
import Tabs from '../tabs';
import SpanText from 'components/span-text';

const { width } = Dimensions.get('window');

export type TabnavRoute = {
    key: string;
    /**
     * Need implement functional at based library
     *
     * @deprecated
     */
    index: number;
    title: string;
    sceneComponent: React.ComponentClass | React.SFC | (() => JSX.Element) | any;
    assets?: KunaAssetUnit[];
};


export const tabNavigationRoutes: TabnavRoute[] = [
    {
        key: 'MARKETS',
        title: _('menu.markets'),
        index: 0,
        sceneComponent: Tabs.MarketTab,
    }, {
        key: 'KUNA_CODE',
        title: _('menu.kuna_code'),
        index: 1,
        sceneComponent: Tabs.KunaCode,
    }, {
        key: 'SETTINGS',
        title: _('menu.setting'),
        index: 2,
        sceneComponent: Tabs.SettingTab,
    },
];


type TabBarProps = {
    navigationState: SlideView.NavigationState<TabnavRoute>;
    position: Animated.Value;
    onPressTab?: (index: number) => void;
};

export class TabBarComponent extends React.PureComponent<TabBarProps> {
    public render(): JSX.Element {
        const { navigationState } = this.props;

        return (
            <View style={tabBarStyles.container}>
                <View style={tabBarStyles.tabBar}>
                    {navigationState.routes.map(this.__renderTabItem)}
                </View>
            </View>
        );
    }

    private __renderTabItem = (route: TabnavRoute, index: number) => (
        <QuoteTabItem key={route.key}
                      route={route}
                      position={this.props.position}
                      index={index}
                      onPress={this.__generatePressTabHandler(index)}
        />
    );

    protected __generatePressTabHandler = (index: number) => {
        const { onPressTab } = this.props;

        return () => onPressTab ? onPressTab(index) : undefined;
    };
}


type TabItemProps = {
    route: TabnavRoute;
    onPress?: () => void;
    index: number;
    position: Animated.Value;
};

class QuoteTabItem extends React.PureComponent<TabItemProps> {
    protected boxAnimatedStyle: StyleProp<any>;

    public constructor(props: TabItemProps) {
        super(props);

        const { position, index } = this.props;

        const inputRange = [index - 1, index, index + 1];

        this.boxAnimatedStyle = {
            transform: [{
                translateX: position.interpolate({
                    inputRange: inputRange,
                    outputRange: [width - 120, 0, -170],
                }),
            }],
            opacity: position.interpolate({
                inputRange: inputRange,
                outputRange: [0.5, 1, 0.2],
            }),
        };
    }

    public render(): JSX.Element {
        const { route } = this.props;

        return (
            <Animated.View style={[tabBarStyles.tab, this.boxAnimatedStyle]}>
                <TouchableOpacity style={tabBarStyles.tabBtn} onPress={this.props.onPress}>
                    <SpanText style={tabBarStyles.text}>{route.title}</SpanText>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
