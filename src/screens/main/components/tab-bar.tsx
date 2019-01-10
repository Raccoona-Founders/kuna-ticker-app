import React from 'react';
import { Animated, Dimensions, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import * as SlideView from 'components/slide-view';
import { tabBarStyles } from '../styles';
import { Color } from 'styles/variables';
import { _ } from 'utils/i18n';
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
        key: 'PORTFOLIO',
        title: _('menu.portfolio'),
        index: 1,
        sceneComponent: Tabs.AccountTab,
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
        const { navigationState, position, onPressTab } = this.props;

        return (
            <View style={tabBarStyles.container}>
                <View style={tabBarStyles.tabBar}>
                    {navigationState.routes.map((route: TabnavRoute, index: number) => (
                        <QuoteTabItem key={route.key}
                                      route={route}
                                      position={position}
                                      index={index}
                                      isActive={navigationState.index === index}
                                      onPress={this.__generatePressTabHandler(index)}
                        />
                    ))}
                </View>
            </View>
        );
    }

    protected __generatePressTabHandler = (index: number) => {
        const { onPressTab } = this.props;

        return () => onPressTab ? onPressTab(index) : undefined;
    };
}


type TabItemProps = {
    route: TabnavRoute;
    onPress?: () => void;
    isActive?: boolean;
    index: number;

    position: Animated.Value;
};

class QuoteTabItem extends React.PureComponent<TabItemProps> {

    protected animatedStyle: StyleProp<any>;
    protected boxAnimatedStyle: StyleProp<any>;

    public constructor(props: TabItemProps) {
        super(props);

        const { position, index } = this.props;

        this.animatedStyle = {
            color: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [Color.GrayBlues, Color.Text, Color.GrayBlues],
                extrapolate: 'clamp',
            }),
        };

        this.boxAnimatedStyle = {
            transform: [{
                translateX: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width - 100, 0, -140],
                }),
            }],
        };
    }

    public render(): JSX.Element {
        const { route } = this.props;

        return (
            <Animated.View style={[tabBarStyles.tab, this.boxAnimatedStyle]}>
                <TouchableOpacity style={tabBarStyles.tabBtn} onPress={this.props.onPress}>
                    <Animated.Text style={[tabBarStyles.text, this.animatedStyle]}>
                        {route.title}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
