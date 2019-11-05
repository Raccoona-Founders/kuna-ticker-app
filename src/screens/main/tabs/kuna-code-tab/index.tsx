import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import { _ } from 'utils/i18n';
import Constants from 'utils/constants';
import AnalTracker from 'utils/ga-tracker';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import TelegramOfferRow from './components/telegram-offer-row';
import OfficialChannel from './components/official-channel';
import styles from './kuna-code-tab.style';


// @ts-ignore
firebase.admob().initialize(Constants.ADMOB_APP_ID);

class KunaCodeTab extends React.Component<KunaCodeTabProps> {
    public state: any = {
        refreshing: false,
    };

    public render(): JSX.Element {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.preBox}>
                        <SpanText style={styles.topic}>{_('kuna-code.topic')}</SpanText>
                        <OfficialChannel />
                    </View>

                    <ScrollView style={{ flex: 1 }}
                                refreshControl={this.__renderRefreshControl()}
                                showsVerticalScrollIndicator={false}
                    >
                        <View style={{ paddingTop: 20 }}>


                            {this.__renderTelegramOfferList()}
                        </View>
                    </ScrollView>
                </View>

                <View style={{ height: Constants.IS_IPHONE_X ? 90 : 60 }} />
            </>
        );
    }


    private __renderTelegramOfferList = () => {
        const telegramOffers = this.props.KunaCode.telegramOffers;
        if (telegramOffers.length === 0) {
            return (
                <View style={{ paddingTop: 50, alignItems: 'center' }}>
                    <SpanText style={{ textAlign: 'center', fontSize: 40 }}>🤓</SpanText>
                    <SpanText style={{ textAlign: 'center', fontSize: 18 }}>
                        There is no offers yet.
                    </SpanText>
                </View>
            );
        }

        return telegramOffers.map(this.__renderTelegramOffer);
    };


    private __renderTelegramOffer = (offer: mobx.kunacode.TelegramOffer, index: number) => {
        // @ts-ignore
        return <TelegramOfferRow offer={offer} key={offer.id} index={index} />;
    };


    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
                tintColor={Color.Fade}
            />
        );
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('KunaCode_UpdateOffers');

        try {
            await this.props.KunaCode.fetchTelegramOffers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}

export default compose<KunaCodeTabProps, { focused: boolean; }>(
    withNavigation,
    inject('KunaCode'),
    observer,
)(KunaCodeTab);


type KunaCodeTabProps
    = mobx.kunacode.WithKunaCodeProps
    & NavigationInjectedProps
    & { focused: boolean; };