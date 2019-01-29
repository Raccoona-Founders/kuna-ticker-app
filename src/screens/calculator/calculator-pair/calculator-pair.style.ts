import { StyleSheet } from 'react-native';
import { Color, DefaultStyles, Fonts } from 'styles/variables';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },

    topic: {
        ...DefaultStyles.mediumFont,
        fontSize: 16,
        marginBottom: 5,
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
        ...DefaultStyles.mediumFont,

        paddingLeft: 15,
        borderRadius: 3,
        height: 48,
        fontSize: 16,
        width: '100%',
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
