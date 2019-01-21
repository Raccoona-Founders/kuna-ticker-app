import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import AnalTracker from 'utils/ga-tracker';
import DescriptionItem from 'components/description-item';
import TelegramLink from 'components/telegram-link';
import { ShadeScrollCard } from 'components/shade-navigator';
import { NavigationInjectedProps } from 'react-navigation';
import TagSide from 'components/tag-side';
import TagCommission from 'components/tag-commission';
import Topic from 'components/topic';
import SpanText from 'components/span-text';

import styles from './view-offer.style';


type Props = NavigationInjectedProps & mobx.kunacode.WithKunaCodeProps;

@inject('KunaCode')
@observer
export default class ViewOfferScreen extends React.Component<Props> {

    public componentDidMount(): void {
        const offer = this._offer;

        AnalTracker.logEvent('kuna_code_view_offer', {
            amount: offer.amount,
            currency: offer.currency,
            side: offer.side,
            user: offer.user.contact,
        });
    }


    public render(): JSX.Element {
        const offer = this._offer;
        const time = moment(offer.creation_time);

        return (
            <ShadeScrollCard>
                <Topic title="KUNA Code Offer"
                       description={time.format('MMM DD, YYYY - HH:mm')}
                />

                <View style={{paddingLeft: 20, paddingRight: 20}}>
                    <DescriptionItem topic="Amount">
                        {numeral(offer.amount).format('0,0.[00]') + " " + offer.currency}
                    </DescriptionItem>

                    <DescriptionItem topic="Operation">
                        <View style={{marginRight: 10}}>
                            <TagSide side={offer.side}/>
                        </View>

                        <TagCommission commission={offer.commission}/>
                    </DescriptionItem>

                    <DescriptionItem topic={`Telegram (${offer.user.name})`}>
                        <TelegramLink telegram={offer.user.contact}
                                      onPress={this._onPressTelegramLink}
                                      style={styles.telegramLink}
                        />
                    </DescriptionItem>

                    {offer.comment ? (
                        <DescriptionItem topic="Comment">
                            <SpanText fontSize={18}>{offer.comment}</SpanText>
                        </DescriptionItem>
                    ) : undefined}
                </View>
            </ShadeScrollCard>
        );
    }


    protected _onPressTelegramLink = () => {
        const offer = this._offer;

        AnalTracker.logEvent('kuna_code_contact_offer', {
            amount: offer.amount,
            currency: offer.currency,
            side: offer.side,
            user: offer.user.contact,
        });
    };


    protected get _offer(): kunacodes.Offer {
        return this.props.navigation.getParam('offer');
    }
}
