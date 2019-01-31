import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Alert, View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { _ } from 'utils/i18n';
import AnalTracker from 'utils/ga-tracker';
import DescriptionItem from 'components/description-item';
import TelegramLink from 'components/telegram-link';
import { ShadeScrollCard } from 'components/shade-navigator';
import { NavigationInjectedProps } from 'react-navigation';
import MDMessage from 'components/md-message';
import TagSide from 'components/tag-side';
import TagCommission from 'components/tag-commission';
import Topic from 'components/topic';
import UIButton from 'components/ui-button';

import styles from './view-offer.style';

type Props = NavigationInjectedProps & mobx.kunacode.WithKunaCodeProps;

@inject('KunaCode')
@observer
export default class ViewOfferScreen extends React.Component<Props> {
    public state: any = {
        deleting: false,
    };

    public componentDidMount(): void {
        const offer = this._offer;

        AnalTracker.logEvent('KunaCode_ViewOffer', {
            amount: offer.amount,
            currency: offer.currency,
            side: offer.side,
            user: offer.user.contact,
        });
    }


    public render(): JSX.Element {
        const offer = this._offer;
        const time = moment(offer.creation_time);
        const isMine = this.props.KunaCode.isMyOffer(this._offer.id);

        return (
            <ShadeScrollCard>
                <Topic title={_('kuna-code.offer-title')}
                       description={time.format('MMM DD, YYYY - HH:mm')}
                />

                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {/* @TODO translate */}
                    <DescriptionItem topic="Amount">
                        {numeral(offer.amount).format('0,0.[00]') + " " + offer.currency}
                    </DescriptionItem>

                    {/* @TODO translate */}
                    <DescriptionItem topic="Operation">
                        <View style={{ marginRight: 10 }}>
                            <TagSide side={offer.side} />
                        </View>

                        <TagCommission commission={offer.commission} />
                    </DescriptionItem>

                    {/* @TODO translate */}
                    <DescriptionItem topic={`Telegram (${offer.user.name})`}>
                        <TelegramLink telegram={offer.user.contact}
                                      onPress={this._onPressTelegramLink}
                                      style={styles.telegramLink}
                        />
                    </DescriptionItem>

                    {/* @TODO translate */}
                    {offer.comment ? (
                        <DescriptionItem topic="Comment">
                            <MDMessage content={offer.comment} />
                        </DescriptionItem>
                    ) : undefined}

                    {/* @TODO translate */}
                    {isMine ? (
                        <UIButton small
                                  danger
                                  onPress={this.__deleteOffer}
                                  title="Delete"
                                  loading={this.state.deleting}
                        />
                    ) : undefined}
                </View>
            </ShadeScrollCard>
        );
    }


    protected _onPressTelegramLink = () => {
        const offer = this._offer;

        AnalTracker.logEvent('KunaCode_ContactOffer', {
            amount: offer.amount,
            currency: offer.currency,
            side: offer.side,
            user: offer.user.contact,
        });
    };

    protected __deleteOffer = () => {
        Alert.alert('Delete offer', 'You can not revert this operation', [
            {
                text: 'Cancel',
            }, {
                text: 'Delete',
                style: 'destructive',
                onPress: this.__agreeDeleteOffer,
            },
        ]);
    };

    private __agreeDeleteOffer = async () => {
        const offer = this._offer;
        this.setState({ deleting: true });
        await this.props.KunaCode.deleteOffer(offer.id);

        this.props.navigation.goBack();
    };


    protected get _offer(): kunacodes.Offer {
        return this.props.navigation.getParam('offer');
    }
}
