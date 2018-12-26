import { StyleSheet } from 'react-native';
import { Color, Fonts } from 'styles/variables';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },

    topic: {
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
        borderRadius: 3,
        height: 48,
        fontSize: 16,
        width: '100%',
        paddingRight: 55,
        borderWidth: 1,
        borderColor: Color.Gray3,
        fontFamily: Fonts.TTNorms_Regular,
        fontWeight: '500',

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
        color: Color.GrayBlues,
    },

    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        paddingRight: 15,
    },

    resultUsdValue: {
        fontSize: 16,
        color: Color.GrayBlues,
    },
});

export default styles;
