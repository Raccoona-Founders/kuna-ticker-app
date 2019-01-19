import React from 'react';
import { View, ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { SpanText } from 'components/span-text';
import { _ } from 'utils/i18n';
import { Color } from 'styles/variables';
import MenuLink from './components/menu-link';
import RouteKeys from 'router/route-keys';

import { styles } from './setting-tab.style';
import Icon from 'components/icon';

type SettingsProps = mobx.user.WithUserProps & NavigationInjectedProps;


// @ts-ignore
@withNavigation
@inject('User')
export default class SettingTab extends React.Component<SettingsProps> {
    public render(): JSX.Element {
        const { User } = this.props;

        return (
            <ScrollView style={styles.container}>
                <MenuLink title={_('setting.menu.about')}
                          route={RouteKeys.Setting_About}
                />

                <MenuLink title={_('setting.menu.kuna-code')}
                          route={RouteKeys.Setting_KunaCode}
                />

                <View style={styles.separator} />

                <View style={styles.settingFooter}>
                    <SpanText style={styles.userId}>User ID: {User.userId}</SpanText>
                    <Icon name="raccoona" height={20} fill={Color.GrayBlues} />
                </View>
            </ScrollView>
        );
    }
}
