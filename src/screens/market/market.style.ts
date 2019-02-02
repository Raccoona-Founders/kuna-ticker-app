import { Dimensions, StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';
import { isIphoneX } from 'utils/helper';

export const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75,
};

const marketStyle = StyleSheet.create({
    topic: {
        paddingLeft: 10,
        paddingRight: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicName: {
        alignItems: 'flex-end',
    },
    topicNameUnit: {
        fontSize: 28,
    },
    topicNameFullname: {
        fontSize: 14,
        color: Color.GrayBlues,
    },

    infoUnit: {
        width: '50%',
    },

    infoUnitValue: {
        color: Color.White,
    },

    infoUnitFirstLine: {
        marginBottom: 10,
    },

    separator: {
        height: 1,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: Color.GrayLight,
        marginTop: 20,
        marginBottom: 20,
    },

    section: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    sectionPrice: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    price: {
        fontSize: 28,
        ...DefaultStyles.boldFont,
    },
    priceUsd: {
        color: Color.GrayBlues,
    },

    sectionInformation: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },


    footer: {
        borderTopWidth: 1,
        borderTopColor: Color.GrayLight,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        paddingBottom: isIphoneX() ? 30 : 10,
    },
    footerButton: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
});

export default marketStyle;
