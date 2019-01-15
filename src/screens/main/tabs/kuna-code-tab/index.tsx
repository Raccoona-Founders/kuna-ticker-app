import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react/native';
import SpanText from 'components/span-text';
import Constants from 'utils/constants';
import styles from './kuna-code-tab.style';
import AnalTracker from 'utils/ga-tracker';
import OfferRow from 'screens/main/tabs/kuna-code-tab/components/offer-row';


// @ts-ignore
firebase.admob().initialize(Constants.ADMOB_APP_ID);

type KunaCodeTabProps = mobx.kunacode.WithKunaCodeProps;

@inject('KunaCode')
@observer
export default class KunaCodeTab extends React.Component<KunaCodeTabProps> {
    public state: any = {
        refreshing: false,
        status: '',
    };

    public render(): JSX.Element {
        const { Banner, AdRequest } = (firebase as any).admob;
        const request = new AdRequest();

        const kunaCodeOffers = this.props.KunaCode.offers;

        return (
            <>
                <View style={styles.container}>
                    <SpanText>{this.state.status}</SpanText>

                    <ScrollView style={{ flex: 1 }} refreshControl={this.__renderRefreshControl()}>
                        {kunaCodeOffers.map(this.__renderOffer)}
                    </ScrollView>
                </View>

                <View style={styles.adBanner}>
                    <SpanText style={styles.adNotification}>
                        It's a test! Don't try to say anything about..! I'll remove it on release next release
                    </SpanText>
                    <Banner
                        unitId={Constants.ADMOB_BANNERS.test}
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

    private __renderOffer = (offer: kunacodes.Offer) => {
        return <OfferRow offer={offer} key={offer.id} />;
    };

    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('update_kuna_code_offers');

        try {
            await this.props.KunaCode.fetchOffers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}
