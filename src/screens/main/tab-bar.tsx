import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import { tabBarStyles } from 'screens/main/styles';
import { Color } from 'styles/variables';
import { _ } from 'utils/i18n';

import MarketTab from './market-tab';
import SettingTab from './setting-tab';
import Tabs from './tabs';

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
        sceneComponent: MarketTab,
    }, {
        key: 'ACCOUNT',
        title: _('menu.account'),
        index: 1,
        sceneComponent: Tabs.AccountTab,
    }, {
        key: 'SETTINGS',
        title: _('menu.setting'),
        index: 2,
        sceneComponent: SettingTab,
    },
];

type TabItemProps = {
    route: TabnavRoute;
    onPress: () => void;
    isActive?: boolean;

    interpolate: (active: any, inactive: any) => any;
};

export const QuoteTabItem = (props: TabItemProps) => {
    const { route, interpolate } = props;

    const animatedStyle = {
        color: interpolate(Color.Text, Color.GrayBlues),
    };

    return (
        <TouchableOpacity style={tabBarStyles.tab} onPress={props.onPress}>
            <Animated.Text style={[tabBarStyles.text, animatedStyle]}>
                {route.title}
            </Animated.Text>
        </TouchableOpacity>
    );
};