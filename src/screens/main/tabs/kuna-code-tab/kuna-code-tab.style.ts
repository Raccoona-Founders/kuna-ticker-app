import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    preBox: {
        backgroundColor: Color.GrayLight,
        borderRadius: 3,
        padding: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        // marginBottom: 20,
    },

    createOffer: {
        flexDirection: 'row',
        height: 44,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Fade,
        borderColor: Color.Fade,
        borderWidth: 2,
        borderRadius: 5,

        shadowColor: Color.Fade,
        shadowOpacity: 0.12,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
    },

    createOfferLabel: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
});
