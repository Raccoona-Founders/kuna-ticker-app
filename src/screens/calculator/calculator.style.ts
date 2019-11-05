import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';

export const styles = StyleSheet.create({
    calcAssetRow: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    valueInput: {
        ...DefaultStyles.mediumFont,

        paddingLeft: 15,
        borderRadius: 3,
        height: 48,
        fontSize: 16,
        width: '100%',
        color: Color.Text,
        paddingRight: 55,
        borderWidth: 1,
        borderColor: Color.Gray3,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    assetIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
    },

    assetIconText: {
        fontSize: 16,
        color: Color.SecondaryText,
    },


    switchCalcButtons: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    switchCalcBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: Color.Gray3,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: Color.White,

        fontSize: 12,
        textTransform: 'uppercase',
        overflow: 'hidden',
    },
    switchCalcBtnActive: {
        borderColor: Color.Main,
        borderRadius: 5,
        backgroundColor: Color.Main,
        color: Color.White,
    },
});
