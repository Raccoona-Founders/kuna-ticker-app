import React from 'react';
import { View, ScrollView } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import AnalTracker from 'utils/ga-tracker';
import { useStores } from 'utils/mobx';
import { _ } from 'utils/i18n';
import { SpanText } from 'components/span-text';
import RouteKeys from 'router/route-keys';
import { Color } from 'styles/variables';
import Icon from 'components/icon';
import Constants from 'utils/constants';
import MenuLink from './components/menu-link';
import { styles } from './setting-tab.style';


export default function SettingTab(): JSX.Element {
    const [rated, setRated] = React.useState(false);
    const [rateLoading, setRateLoading] = React.useState(false);

    const { User } = useStores();

    const onRateApplication = () => {
        const options = {
            AppleAppID: '1441322325',
            GooglePackageName: 'com.kunaticker',
            AmazonPackageName: 'com.kunaticker',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: false,
            openAppStoreIfInAppFails: true,
        };

        AnalTracker.logEvent('Rate_Click');
        setRateLoading(true);

        Rate.rate(options, success => {
            if (success) {
                AnalTracker.logEvent('Rate_Success');

                // this technically only tells us if the user successfully
                // went to the Review Page. Whether they actually did anything, we do not know.
                setRated(true);
            }

            setRateLoading(false);
        });
    };


    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.preContent}>
                <SpanText style={styles.topic}>{_('setting.topic')}</SpanText>
                <SpanText style={styles.userId}>User ID: {User.userId}</SpanText>
            </View>

            <View style={styles.menuBox}>
                <MenuLink title={_('setting.menu.about')}
                          route={RouteKeys.Setting_About}
                />

                <MenuLink title={_('setting.menu.rate-app')}
                          isLoading={rateLoading}
                          onPress={onRateApplication}
                />

                <View style={styles.separator} />

                <View style={styles.settingFooter}>
                    <Icon name="raccoona" size={20} fill={Color.GrayBlues} />
                </View>
            </View>

            <View style={{ height: Constants.IS_IPHONE_X ? 90 : 60 }} />
        </ScrollView>
    );
}
