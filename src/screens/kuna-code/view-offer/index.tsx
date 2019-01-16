import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import AnalTracker from 'utils/ga-tracker';
import { ShadeScrollCard } from 'components/shade-navigator';
import { NavigationInjectedProps } from 'react-navigation';
import Topic from 'components/topic';


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
                       description={time.format('DD, MMM YYYY HH:mm')}
                />
            </ShadeScrollCard>
        );
    }

    protected get _offer(): kunacodes.Offer {
        return this.props.navigation.getParam('offer');
    }
}


