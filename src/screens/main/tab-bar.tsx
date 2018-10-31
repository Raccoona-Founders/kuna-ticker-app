import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import { tabBarStyles } from 'screens/main/styles';
import { Color } from 'styles/variables';

export type TabnavRoute = {
    key: string;
    title: string;
    assets?: KunaAssetUnit[];
};

export const tabNavigationRoutes: TabnavRoute[] = [
    {
        key: 'UAH',
        title: 'UAH',
        assets: [KunaAssetUnit.UkrainianHryvnia],
    }, {
        key: KunaAssetUnit.Bitcoin,
        title: 'BTC',
        assets: [KunaAssetUnit.Bitcoin],
    }, {
        key: 'OTHER',
        title: 'Other',
        assets: [KunaAssetUnit.StasisEuro, KunaAssetUnit.Ethereum, KunaAssetUnit.GolosGold],
    }, {
        key: 'ABOUT',
        title: 'About',
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
            scale: interpolate(1, 0.8),
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