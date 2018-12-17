import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import { tabBarStyles } from 'screens/main/styles';
import { Color } from 'styles/variables';
import { _ } from 'utils/i18n';

import MarketTab from './market-tab';
import AboutTab from './about-tab';

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
        key: 'UAH',
        title: 'UAH',
        index: 0,
        sceneComponent: MarketTab,
        assets: [
            KunaAssetUnit.UkrainianHryvnia,
        ],
    }, {
        key: KunaAssetUnit.Bitcoin,
        title: 'BTC',
        index: 1,
        sceneComponent: MarketTab,
        assets: [
            KunaAssetUnit.Bitcoin,
        ],
    }, {
        key: 'OTHER',
        title: _('menu.other'),
        index: 2,
        sceneComponent: MarketTab,
        assets: [
            KunaAssetUnit.StasisEuro,
            KunaAssetUnit.Ethereum,
            KunaAssetUnit.GolosGold,
            KunaAssetUnit.AdvancedRUB,
            KunaAssetUnit.AdvancedUSD,
        ],
    }, {
        key: 'ABOUT',
        title: _('menu.about'),
        index: 3,
        sceneComponent: AboutTab,
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
        color: interpolate(Color.DarkPurple, Color.Gray2),
        transform: [{
            scale: interpolate(1.35, 1),
        }, {
            translateY: interpolate(-2, 0),
        }],
    };

    return (
        <TouchableOpacity style={tabBarStyles.tab} onPress={props.onPress}>
            <Animated.Text style={[tabBarStyles.text, animatedStyle]}>
                {route.title}
            </Animated.Text>
        </TouchableOpacity>
    );
};