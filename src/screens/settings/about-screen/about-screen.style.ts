import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';


export const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    topic: {
        marginTop: 10,
        marginBottom: 10,
    },
    topicTitle: {
        color: Color.DarkPurple,
        fontSize: 24,
        fontWeight: '600',
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
        color: Color.GrayBlues,
    },
    linkItemLabel: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: '500',
    },
});
