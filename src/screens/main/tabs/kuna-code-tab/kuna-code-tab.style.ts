import { StyleSheet } from 'react-native';
import { isIphoneX } from 'utils/helper';
import { Color } from 'styles/variables';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    createOffer: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Color.White,
        borderColor: Color.Fade,
        borderWidth: 2,

        shadowColor: Color.Fade,
        shadowOpacity: 0.12,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
    },
});
