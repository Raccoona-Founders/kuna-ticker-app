import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';
import { isIphoneX } from 'utils/helper';

export default StyleSheet.create({
    body: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },


    footer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: isIphoneX() ? 40 : 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
    },


    submitButton: {
        width: 150,
        backgroundColor: Color.Main,
    },
    submitButtonText: {
        color: Color.White,
    },

    footerTextBox: {
        flex: 1,
        marginRight: 20,
    },

    footerText: {
        fontSize: 12,
        color: Color.GrayBlues,
    },
});
