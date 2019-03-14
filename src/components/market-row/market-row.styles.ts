import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

const styles = StyleSheet.create({
    listItemLink: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    listItemLinkInvisible: {
        height: 0,
        overflow: 'hidden',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 74,
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
        alignItems: 'center',
    },

    marketVolume: {
        fontSize: 14,
        color: Color.GrayBlues,
    }
});

export default styles;
