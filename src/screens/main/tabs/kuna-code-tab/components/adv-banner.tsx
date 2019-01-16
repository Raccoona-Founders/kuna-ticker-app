import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import RemoteConfig from 'utils/remote-config';
import { isIphoneX } from 'utils/helper';
import Constants from 'utils/constants';


export default class AdvBanner extends React.PureComponent {
    public state: any = {
        enableAdv: false,
    };

    public async componentDidMount(): Promise<void> {
        const enableAdv = await RemoteConfig.getValue('ab_test_ads_1');

        this.setState({
            enableAdv: enableAdv.val(),
        });
    }

    public render(): JSX.Element {
        if (!this.state.enableAdv) {
            return <View />;
        }

        const { Banner, AdRequest } = (firebase as any).admob;
        const request = new AdRequest();

        return (
            <View style={styles.adBanner}>
                <Banner
                    unitId={Constants.ADMOB_BANNERS.test}
                    size="SMART_BANNER"
                    request={request.build()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    adBanner: {
        width: '100%',
        paddingBottom: isIphoneX() ? 30 : 0,
    },
});