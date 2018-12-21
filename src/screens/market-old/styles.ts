import { Dimensions, StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75,
};

export const styles = StyleSheet.create({
    marketInfoContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    backButton: {
        color: Color.Main,
        fontSize: 16,
        lineHeight: 44,
    },

    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    panel: {
        height: screen.height + 300,
        padding: 20,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#000000AA',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },

    content: {
        fontSize: 20,
        textAlign: 'center',
    },
    topic: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    topicAssetName: {},
    topicAssetText: {
        fontSize: 20,
        fontWeight: '500',
    },
    topicAssetSubtext: {
        marginTop: 5,
        fontSize: 14,
        color: Color.Gray2,
    },
    topicAssetSubtextName: {
        fontWeight: '600',
    },

    priceContainer: {
        marginTop: 20,
        marginLeft: 88,
        marginRight: 20,
    },
    priceCoinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    priceSecondaryInfoContainer: {

    },
    priceTextValue: {
        lineHeight: 24,
        fontSize: 24,
        fontWeight: '500',
        color: Color.DarkPurple,
    },

    priceUsd: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.Gray2,
    },
    priceTextAsset: {
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 5,
    },

    infoContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    depthButton: {
        marginBottom: 20,
        height: 50,
        width: '100%',
        borderColor: Color.Gray3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    depthButtonText: {
        color: Color.DarkPurple,
        fontSize: 16,
        textTransform: 'uppercase',
    },

    riddleButton: {
        position: 'absolute',
        right: 20,
        top: 0,
        width: 80,
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