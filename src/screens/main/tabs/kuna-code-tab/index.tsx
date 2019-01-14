import React from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import SpanText from 'components/span-text';
import Constants from 'utils/constants';
import styles from './kuna-code-tab.style';


// @ts-ignore
const advert = firebase.admob().interstitial(Constants.AD_MOB_ID);

export default class KunaCodeTab extends React.Component {
    public state: any = {
        status: '',
    };

    public render(): JSX.Element {
        const { Banner, AdRequest } = (firebase as any).admob;
        const request = new AdRequest();

        return (
            <>
                <View style={styles.container}>
                    <SpanText>{this.state.status}</SpanText>
                </View>

                <View style={styles.adBanner}>
                    <SpanText style={styles.adNotification}>
                        It's a test! Don't try to say anything about..! I'll remove it on release next release
                    </SpanText>
                    <Banner
                        unitId={Constants.AD_MOB_ID}
                        size="SMART_BANNER"
                        request={request.build()}
                        onAdLoaded={() => {
                            this.setState({ status: 'Advert loaded' });
                        }}
                    />
                </View>
            </>
        );
    }
}
