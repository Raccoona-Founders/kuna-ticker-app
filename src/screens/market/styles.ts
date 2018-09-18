import { Dimensions, StyleSheet } from 'react-native'
import { Color } from 'styles/variables';

export const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75,
};

export const styles = StyleSheet.create({
    marketInfoContainer: {
        flex: 1,
        paddingTop: 10,
    },
    backButton: {
        color: Color.Primary,
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
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topicAsset: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicAssetName: {},
    topicAssetText: {
        fontSize: 20,
        fontWeight: '500',
    },
    topicAssetSubtext: {
        marginTop: 5,
        fontSize: 14,
        color: Color.TextSecondary,
    },
    topicAssetSubtextName: {
        fontWeight: '600',
    },

    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    priceMarketContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontWeight: '500',
        flex: 1,
    },
    priceUsd: {
        textAlign: 'right',
        fontSize: 24,
        fontWeight: '500',
        color: Color.TextDarkSecondary,
        flex: 1,
    },
    priceTopic: {
        color: Color.TextSecondary,
        fontSize: 14,
        marginBottom: 5,
        fontWeight: '500',
        width: '100%',
    },
    priceTextValue: {
        lineHeight: 24,
        fontSize: 24,
        fontWeight: '500',
        color: Color.Primary,
    },
    priceTextAsset: {
        lineHeight: 24,
        marginLeft: 5,
    },

    infoContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
