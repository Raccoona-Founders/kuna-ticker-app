import React from 'react';
import { TouchableOpacity } from 'react-native';
import SpanText from 'components/span-text';
import TelegramLink from './telegram-link';

type OfferRowProps = {
    offer: kunacodes.Offer;
};

export default class OfferRow extends React.Component<OfferRowProps> {
    public render(): JSX.Element {

        const { offer } = this.props;

        return (
            <TouchableOpacity style={{ marginTop: 20 }}>
                <SpanText>{offer.amount} {offer.currency}</SpanText>
                <SpanText>{offer.comment}</SpanText>
                {offer.user && <SpanText>{offer.user.contact}</SpanText>}
            </TouchableOpacity>
        );
    }
}
