import { StyleSheet } from 'react-native';
import { Color, Fonts } from 'styles/variables';

export const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexDirection: 'column',
    },

    topic: {
        color: Color.Gray2,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },

    valueInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    calcAssetRow: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    valueInput: {
        paddingLeft: 15,
        backgroundColor: Color.Gray,
        borderRadius: 3,
        height: 48,
        fontSize: 16,
        width: '100%',
        paddingRight: 55,
        borderWidth: 1,
        borderColor: Color.Gray3,
        fontFamily: Fonts.TTNorms_Regular,
        fontWeight: '500',
    },

    assetIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        width: 50,
    },

    assetIconText: {
        fontSize: 16,
        color: Color.Gray2,
    },

    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        paddingRight: 15,
    },

    resultUsdValue: {
        fontSize: 16,
        color: Color.Gray2,
    },
});
