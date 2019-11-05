import React from 'react';
import { Animated, Dimensions, StyleProp, TouchableOpacity, View } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { _ } from 'utils/i18n';
import SpanText from 'components/span-text';
import * as SlideView from 'components/slide-view';
import { tabBarStyles } from '../styles';
import Tabs from '../tabs';

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
    icon: string;
    sceneComponent: React.ComponentClass | React.FunctionComponent | (() => JSX.Element) | any;
    assets?: KunaAssetUnit[];
};


export const tabNavigationRoutes: TabnavRoute[] = [
    {
        key: 'DASHBOARD',
        title: _('menu.dashboard'),
        index: 0,
        icon: 'chart-bar',
        sceneComponent: Tabs.DashboardTab,
    }, {
        key: 'MARKETS',
        title: _('menu.markets'),
        index: 1,
        icon: 'list-ul',
        sceneComponent: Tabs.MarketTab,
    }, {
        key: 'KUNA_CODE',
        title: _('menu.kuna_code'),
        index: 2,
        icon: 'poll',
        sceneComponent: Tabs.KunaCode,
    }, {
        key: 'SETTINGS',
        title: _('menu.setting'),
        index: 3,
        icon: 'cogs',
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

    private __renderTabItem = (route: TabnavRoute, index: number) => {
        const { onPressTab } = this.props;

        return (
            <QuoteTabItem
                key={route.key}
                route={route}
                position={this.props.position}
                index={index}
                onPress={() => onPressTab ? onPressTab(index) : undefined}
            />
        )
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
            opacity: position.interpolate({
                inputRange: inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
            }),
        };
    }

    public render(): JSX.Element {
        const { route } = this.props;

        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Animated.View style={[tabBarStyles.tab, this.boxAnimatedStyle]}>
                    <FontAwesome5Icon name={route.icon} size={22} />
                    <SpanText style={tabBarStyles.text}>{route.title}</SpanText>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}
