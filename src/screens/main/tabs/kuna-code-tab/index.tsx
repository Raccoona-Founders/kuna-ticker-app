import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Constants from 'utils/constants';
import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import SpanText from 'components/span-text';
import AdvBanner from './components/adv-banner';
import OfferRow from './components/offer-row';
import OfficialChannel from './components/official-channel';
import styles from './kuna-code-tab.style';
import { Color } from 'styles/variables';


// @ts-ignore
firebase.admob().initialize(Constants.ADMOB_APP_ID);

type KunaCodeTabProps
    = mobx.kunacode.WithKunaCodeProps
    & NavigationInjectedProps
    & { focused: boolean; };

// @ts-ignore
@withNavigation
@inject('KunaCode')
@observer
export default class KunaCodeTab extends React.Component<KunaCodeTabProps> {
    public state: any = {
        refreshing: false,
    };

    public render(): JSX.Element {
        return (
            <>
                <View style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        refreshControl={this.__renderRefreshControl()}
                        showsVerticalScrollIndicator={false}
                    >
                        <OfficialChannel />
                        {this.__renderOffersList()}
                    </ScrollView>

                    <TouchableOpacity style={styles.createOffer} onPress={this.__onPressAddOffer}>
                        <Icon name="plus" size={16} color={Color.Fade} />
                    </TouchableOpacity>
                </View>

                <AdvBanner showBanner={this.props.focused} />
            </>
        );
    }


    private __renderOffersList = () => {
        const kunaCodeOffers = this.props.KunaCode.sortedOffers;
        if (kunaCodeOffers.length === 0) {
            return (
                <View style={{ paddingTop: 50, alignItems: 'center' }}>
                    <SpanText style={{ textAlign: 'center', fontSize: 40 }}>🤓</SpanText>
                    <SpanText style={{ textAlign: 'center', fontSize: 18 }}>
                        There is no offers yet...
                    </SpanText>
                </View>
            );
        }

        return kunaCodeOffers.map(this.__renderOffer);
    };


    private __renderOffer = (offer: kunacodes.Offer, index: number) => {
        // @ts-ignore
        return <OfferRow offer={offer} key={offer.id} index={index} />;
    };


    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __onPressAddOffer = () => {
        this.props.navigation.push(RouteKeys.KunaCode_CreateOffer);
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('KunaCode_UpdateOffers');

        try {
            await this.props.KunaCode.fetchOffers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}
