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
    },
    priceValue: {
        fontSize: 18,
        marginRight: 4,
    },
    priceLabel: {
        fontSize: 18,
        color: Color.TextDarkSecondary,
    },

    marketVolume: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '500',
        color: Color.TextSecondary,
    },
});