import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { ShadeScrollCard } from 'components/shade-navigator';

@inject('KunaCode')
@observer
export default class CreateOfferScreen extends React.Component {
    public render(): JSX.Element {
        return (
            <ShadeScrollCard>

            </ShadeScrollCard>
        );
    }
}
