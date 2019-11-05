import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import RouteKeys from 'router/route-keys';
import SpanText from 'components/span-text';
import TagCommission from 'components/tag-commission';
import TagSide from 'components/tag-side';
import { Color, DefaultStyles } from 'styles/variables';


type OfferRowProps = {
    offer: kunacodes.Offer;
    index: number;
};


export default function OfferRow(props: OfferRowProps): JSX.Element {
    const { offer } = props;
    const navigation = useNavigation();

    const onPressRow = () => {
        navigation.push(RouteKeys.KunaCode_ViewOffer, {
            offer: offer,
        });
    };

    return (
        <>
            <TouchableOpacity style={styles.rowBox} onPress={onPressRow}>
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


const styles = StyleSheet.create({
    separator: {
        marginBottom: 10,
        marginTop: 10,
    },
    rowBox: {
        padding: 15,
        borderRadius: 5,
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
        color: Color.SecondaryText,
    },
});
