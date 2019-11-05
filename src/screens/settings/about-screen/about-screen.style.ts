import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';


export const styles = StyleSheet.create({
    body: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    topic: {
        marginTop: 10,
        marginBottom: 10,
    },
    topicTitle: {
        ...DefaultStyles.boldFont,
        color: Color.DarkPurple,
        fontSize: 24,
    },

    separator: {
        marginTop: 20,
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
    },
    linksContainer: {},
    linkItem: {
        marginBottom: 20,
    },
    linkItemTitle: {
        color: Color.SecondaryText,
    },
    linkItemLabel: {
        ...DefaultStyles.mediumFont,
        marginTop: 3,
        fontSize: 18,
    },
});
