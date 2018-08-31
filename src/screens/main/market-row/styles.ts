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
        backgroundColor: '#fff',
        borderBottomColor: Color.BorderLight,
        borderBottomWidth: 1,
    },

    tickerCell: {
        alignItems: 'flex-end',
    },

    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '300',
        lineHeight: 16,
    },

    priceBox: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    priceValue: {
        marginRight: 4,
    },
    priceLabel: {
        color: Color.TextDarkSecondary,
    },

    marketVolume: {
        fontSize: 10,
        fontWeight: '400',
    },
});