import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    preContent: {
        flex: 1,
        backgroundColor: Color.GrayLight,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuBox: {
        marginTop: 10,
        marginBottom: 10,
    },

    separator: {
        marginTop: 20,
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
    },

    settingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    userId: {
        marginBottom: 20,
        fontSize: 14,
        color: Color.GrayBlues,
    },
});
