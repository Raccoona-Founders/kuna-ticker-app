import { Dimensions, StyleSheet } from 'react-native';
import { Color, Fonts } from 'styles/variables';

export const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75,
};

const styles = StyleSheet.create({
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
        fontSize: 12,
        opacity: 0.8,
    },

    separator: {
        height: 1,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: Color.GrayLight,
        marginTop: 20,
        marginBottom: 20,
    },

    sectionPrice: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    price: {
        fontSize: 28,
        fontFamily: Fonts.TTNorms_Bold,
    },
    priceUsd: {
        opacity: 0.8,
    },

    priceChangeBox: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        height: 30
    },
    priceChangeBoxUp: {
        backgroundColor: '#00BA4F33'
    },
    priceChangeBoxDown: {
        backgroundColor: '#FD2A4733'
    },


    priceChange: {
        fontSize: 14,
    },
    priceChangeUp: {
        color: Color.Success
    },
    priceChangeDown: {
        color: Color.Danger
    }
});

export default styles;
