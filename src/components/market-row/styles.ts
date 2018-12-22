import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    listItemLink: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 74,
    },

    listItemSeparator: {
        borderBottomColor: Color.GrayLight,
        borderBottomWidth: 1,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
    },

    tickerCell: {
        alignItems: 'flex-end',
    },

    priceBox: {
        flexDirection: 'row',
    },
    priceValue: {
        fontSize: 18,
    },

    secondaryInfo: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    marketVolume: {
        fontSize: 14,
        color: Color.GrayBlues,
    },

    separator: {
        fontSize: 14,
        color: Color.GrayBlues,
    },
    dailyChange: {
        fontSize: 14,
    },
    dailyChangeUp: {
        color: Color.Success
    },
    dailyChangeDown: {
        color: Color.Danger
    },
});