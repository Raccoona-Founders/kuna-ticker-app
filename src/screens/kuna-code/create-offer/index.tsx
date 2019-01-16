import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { ShadeScrollCard } from 'components/shade-navigator';
import AnalTracker from 'utils/ga-tracker';
import Topic from 'components/topic';

@inject('KunaCode')
@observer
export default class CreateOfferScreen extends React.Component {

    public componentDidMount(): void {
        AnalTracker.logEvent('kuna_code_start_create_offer');
    }

    public render(): JSX.Element {
        return (
            <ShadeScrollCard>
                <Topic title="Create offer"
                       description="Your personal offer to Buy or Sell KUNA Code!"
                />
            </ShadeScrollCard>
        );
    }
}
