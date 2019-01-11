import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { SpanText } from 'components/span-text';
import { _ } from 'utils/i18n';
import { Color } from 'styles/variables';
import MenuLink from './components/menu-link';
import RouteKeys from 'router/route-keys';

import { styles } from './setting-tab.style';

type SettingsProps = MobxUser.WithUserProps & NavigationInjectedProps;


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

                <View style={styles.separator} />

                <SpanText style={{ marginBottom: 20, fontSize: 14, color: Color.GrayBlues }}>
                    User ID: {User.userId}
                </SpanText>
            </ScrollView>
        );
    }
}
