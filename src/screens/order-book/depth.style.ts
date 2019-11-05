import { StyleProp, StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';
import { isIphoneX } from 'utils/helper';

export default StyleSheet.create({
    container: {},
    depthSheetContainer: {
        paddingLeft: 20,
        paddingRight: 20,

    },
    topic: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    topicText: {
        fontSize: 24,
    },

    topicTextMarket: {
        color: Color.SecondaryText,
    },

    spreadContainer: {
        justifyContent: 'space-between',
        // alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },

    spreadValueBox: {
        alignItems: 'center',
    },
    spreadValue: {},
    spreadPercentage: {
        marginLeft: 5,
        fontSize: 12,
    },

    spreadText: {
        fontSize: 18,
    },

    depthSheet: {
        width: '100%',
    },
    depthSheetBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    depthSheetSide: {
        width: '50%',
        // aspectRatio: 1,
    },

    groupingButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupingContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: isIphoneX() ? 40 : 10,
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Color.White,
    },
    groupingValue: {},

    groupingButton: {
        marginLeft: 15,
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.Gray3,
    },
    groupingButtonText: {
        fontSize: 20,
    },

    depthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    depthHeaderCell: {
        fontSize: 12,
        color: Color.SecondaryText,
    },
});

export const sideRowStyles = StyleSheet.create({
    orderRow: {
        height: 28,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },

    containerBid: {
        flexDirection: 'row-reverse',
    },

    containerAsk: {},

    price: {
        fontSize: 14,
    },
    priceAsk: {
        paddingLeft: 5,
        color: Color.Danger,
    },
    priceBid: {
        paddingRight: 5,
        color: Color.Main,
    },

    value: {
        ...DefaultStyles.mediumFont,
        fontSize: 14,
        color: Color.DarkPurple,
    },

    valueIndicator: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        zIndex: 1,
        opacity: 0.1,
        backgroundColor: Color.Gray3,
    },

    valueIndicatorAsk: {
        left: 0,
        backgroundColor: Color.Danger,
    },

    valueIndicatorBid: {
        right: 0,
        backgroundColor: Color.Main,
    },
});

export function chooseSideRowStyles(type: 'ask' | 'bid'): StyleProp<any>[] {
    switch (type) {
        case 'ask':
            return [
                sideRowStyles.containerAsk,
                sideRowStyles.priceAsk,
                sideRowStyles.valueIndicatorAsk,
            ];

        case 'bid':
            return [
                sideRowStyles.containerBid,
                sideRowStyles.priceBid,
                sideRowStyles.valueIndicatorBid,
            ];
    }
}
