import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    contentContainer: {
        flex: 1,
    },

    preContent: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    topic: {
        fontSize: 28,
        ...DefaultStyles.boldFont,
    },

    menuBox: {
        marginVertical: 10,
        marginHorizontal: 20,
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
        color: Color.SecondaryText,
    },
});
