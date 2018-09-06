import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: Color.BorderLight,
        borderTopColor: Color.BorderLight,
    },

    calcWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
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
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Color.BorderLight,
        borderRadius: 4,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
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


    resultValue: {
        flex: 1,
    },
});
