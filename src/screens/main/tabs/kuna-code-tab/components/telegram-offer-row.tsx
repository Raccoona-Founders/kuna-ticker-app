import React from 'react';
import numeral from 'numeral';
import { View, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import SpanText from 'components/span-text';
import TagCommission from 'components/tag-commission';
import { Color, DefaultStyles } from 'styles/variables';


type OfferRowProps = NavigationInjectedProps & {
    offer: mobx.kunacode.TelegramOffer;
    index: number;
};

// @ts-ignore
@withNavigation
export default class TelegramOfferRow extends React.Component<OfferRowProps> {
    public render(): JSX.Element {
        const { offer } = this.props;

        const color = '#' + offer.token;
        const colorIsOk = /^#[0-9A-F]{6}$/i.test(color);

        return (
            <>
                <TouchableOpacity style={styles.rowBox} onPress={this._onPressRow}>
                    <View style={styles.amountBox}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {colorIsOk ?
                                    <View style={[{ backgroundColor: color }, styles.colorPoint]} /> : undefined}
                                <SpanText style={styles.token}>{offer.token}</SpanText>
                            </View>

                            <SpanText style={styles.amount}>
                                {numeral(offer.sum).format('0,0.[00]')} UAH
                            </SpanText>

                            {offer.partial ? (
                                <SpanText style={styles.amountPartial}>
                                    (частями от {numeral(offer.partial).format('0,0')} UAH)
                                </SpanText>
                            ) : undefined}
                        </View>

                        <View style={{ alignItems: 'flex-end' }}>
                            <TagCommission commission={offer.percent / 100} />
                            {offer.percent !== 0 ? (
                                <SpanText style={styles.price}>
                                    Цена: {numeral(offer.price).format('0,0.[00]')} UAH
                                </SpanText>
                            ) : undefined}
                        </View>
                    </View>


                    <SpanText style={styles.bank}>
                        {offer.bankName}
                    </SpanText>
                </TouchableOpacity>

                <View style={styles.separator} />
            </>
        );
    }

    protected _onPressRow = () => {
        const { offer } = this.props;

        const buttons: any[] = [{
            text: 'Отменить',
            style: 'cancel',
        }, {
            text: 'Перейти в @KUNACodeBot',
            onPress: this.__openTelegramBot,
        }];

        Alert.alert('Заявка', offer.description, buttons);
    };


    protected __openTelegramBot = () => {
        // const { offer } = this.props;
        // const link = `https://t.me/kunacodebot?start=${offer.token}`;

        const link = 'https://t.me/kunacodebot';

        Linking.openURL(link).catch((error) => {
            console.log(error);
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
        borderRadius: 5,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: Color.Gray3,
    },
    colorPoint: {
        height: 10,
        width: 10,
        borderRadius: 10,
        marginRight: 5,
    },
    token: {
        color: Color.GrayBlues,
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
    price: {
        marginTop: 5,
        fontSize: 14,
        color: Color.GrayBlues,
    },
    amountPartial: {
        fontSize: 14,
        color: Color.GrayBlues,
    },
    bank: {
        marginTop: 5,
        color: Color.Success,
    },
});
