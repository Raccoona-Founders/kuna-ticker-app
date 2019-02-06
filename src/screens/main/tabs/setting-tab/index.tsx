import React from 'react';
import { View, ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';
import Rate, { AndroidMarket } from 'react-native-rate';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import AnalTracker from 'utils/ga-tracker';
import { _ } from 'utils/i18n';
import { SpanText } from 'components/span-text';
import RouteKeys from 'router/route-keys';
import { Color } from 'styles/variables';
import MenuLink from './components/menu-link';


import { styles } from './setting-tab.style';
import Icon from 'components/icon';

type SettingsProps
    = mobx.user.WithUserProps
    & NavigationInjectedProps;


// @ts-ignore
@withNavigation
@inject('User')
export default class SettingTab extends React.Component<SettingsProps> {
    public state: any = {
        rated: false,
        rateLoading: false,
    };

    public render(): JSX.Element {
        const { User } = this.props;
        const { rateLoading = false } = this.state;

        return (
            <ScrollView style={styles.container}>
                <MenuLink title={_('setting.menu.about')}
                          route={RouteKeys.Setting_About}
                />

                <MenuLink title={_('setting.menu.kuna-code')}
                          route={RouteKeys.Setting_KunaCode}
                />

                <MenuLink title={_('setting.menu.rate-app')}
                          isLoading={rateLoading}
                          onPress={this.__rateApplication}
                />

                <View style={styles.separator} />

                <View style={styles.settingFooter}>
                    <SpanText style={styles.userId}>User ID: {User.userId}</SpanText>
                    <Icon name="raccoona" height={20} fill={Color.GrayBlues} />
                </View>
            </ScrollView>
        );
    }

    protected __rateApplication = () => {
        const options = {
            AppleAppID: '1441322325',
            GooglePackageName: 'com.kunaticker',
            AmazonPackageName: 'com.kunaticker',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: true,
        };

        AnalTracker.logEvent('Rate_Click');
        this.setState({ rateLoading: true });

        Rate.rate(options, success => {
            if (success) {
                AnalTracker.logEvent('Rate_Success');

                // this technically only tells us if the user successfully
                // went to the Review Page. Whether they actually did anything, we do not know.
                this.setState({ rated: true });
            }

            this.setState({ rateLoading: false });
        });
    };
}
