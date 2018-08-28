import { StyleSheet } from 'react-native'
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    pairContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    backButton: {
        color: Color.Primary,
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
        padding: 10,

    },

    infoContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
