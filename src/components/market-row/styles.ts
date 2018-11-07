import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    listItemLink: {
        paddingLeft: 20,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 74,
        paddingRight: 20,
        borderBottomColor: Color.Gray3,
        borderBottomWidth: 1,
    },

    tickerCell: {
        alignItems: 'flex-end',
    },

    priceBox: {
        flexDirection: 'row',
    },
    priceValue: {
        fontSize: 18,
        marginRight: 4,
    },
    priceLabel: {
        fontSize: 18,
        color: Color.Gray2,
    },

    marketVolume: {
        marginTop: 5,
        fontSize: 14,
        color: Color.Gray2,
    },
});