import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    depthSheetContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    topic: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    topicTitle: {
        fontSize: 24,
    },

    depthSheet: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    depthSheetSide: {
        width: '50%',
    },
});

