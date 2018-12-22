import { Dimensions, StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

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
        fontWeight: '700',
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
        padding: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerButton: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }
});

export default marketStyle;
