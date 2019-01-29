import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import RouteKeys from 'router/route-keys';
import SpanText from 'components/span-text';
import TagCommission from 'components/tag-commission';
import TagSide from 'components/tag-side';
import { Color, DefaultStyles } from 'styles/variables';


type OfferRowProps = NavigationInjectedProps & {
    offer: kunacodes.Offer;
    index: number;
};

// @ts-ignore
@withNavigation
export default class OfferRow extends React.Component<OfferRowProps> {
    public render(): JSX.Element {
        const { offer, index } = this.props;

        return (
            <>
                <TouchableOpacity style={styles.rowBox} onPress={this._onPressRow}>
                    <View style={styles.amountBox}>
                        <SpanText style={styles.amount}>
                            {numeral(offer.amount).format('0,0.[00]')} {offer.currency}
                        </SpanText>

                        <View style={styles.tags}>
                            <View style={{ marginRight: 10, }}>
                                <TagSide side={offer.side} />
                            </View>
                            <TagCommission commission={offer.commission} />
                        </View>
                    </View>

                    {offer.user && <SpanText>{offer.user.contact}</SpanText>}
                    <SpanText style={styles.date}>
                        {moment(offer.creation_time).fromNow()}
                    </SpanText>
                </TouchableOpacity>

                <View style={styles.separator} />
            </>
        );
    }

    protected _onPressRow = () => {
        const { offer, navigation } = this.props;
        navigation.push(RouteKeys.KunaCode_ViewOffer, {
            offer: offer,
        });
    };
}


const styles = StyleSheet.create({
    separator: {
        marginBottom: 10,
        marginTop: 10,
    },
    rowBox: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Color.Gray3,
    },
    amountBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        ...DefaultStyles.boldFont,
        fontSize: 18,
    },
    date: {
        marginTop: 5,
        color: Color.GrayBlues,
    },
});
