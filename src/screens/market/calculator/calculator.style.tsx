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

    reversButton: {
        width: 50,
        height: 44,
    },

    valueInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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

    valueInputAsset: {
        position: 'absolute',
        color: Color.TextDarkSecondary,
        right: 10,
        fontSize: 18,
    },


    resultValueContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 4,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    resultValueText: {
        fontSize: 18,
        textAlign: 'right',
        minWidth: '30%'
    },

    resultValueTextAsset: {
        color: Color.TextDarkSecondary,
        marginRight: 20,
    },

    changeButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
