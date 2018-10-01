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
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Color.BorderLight,
        borderRadius: 4,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    valueInput: {
        fontSize: 18,
        width: '100%',
        paddingRight: 40,
    },

    valueInputAsset: {
        position: 'absolute',
        color: Color.TextDarkSecondary,
        right: 10,
    },


    resultValueContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: Color.BorderLight,
        borderRadius: 4,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },

    resultValueText: {
        fontSize: 18,
        width: '100%',
        paddingRight: 40,
    },
});
