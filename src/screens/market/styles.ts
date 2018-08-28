import { StyleSheet } from 'react-native'
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    marketInfoContainer: {},
    backButton: {
        color: Color.Primary,
        lineHeight: 44,
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
    },
    topic: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    priceContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Color.BorderLight
    },

    priceText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    priceTextValue: {
        lineHeight: 24,
        fontSize: 24,
        fontWeight: '500',
        color: Color.Primary
    },
    priceTextAsset: {
        lineHeight: 22,
        marginLeft: 5
    },

    infoContainer: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: Color.BorderLight
    }
});
