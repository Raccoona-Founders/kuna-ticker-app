import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexDirection: 'column',
    },

    topic: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: '500',
        color: Color.TextSecondary,
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
        paddingLeft: 10,
        backgroundColor: Color.BorderLight,
        borderRadius: 4,
        height: 44,
        fontSize: 18,
        width: '100%',
        paddingRight: 50,
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
        color: Color.TextSecondary,
    },
});
