import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    depthSheetContainer: {
        paddingLeft: 20,
        paddingRight: 20,

    },
    topic: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    topicText: {
        fontSize: 24,
    },

    topicTextMarket: {
        color: Color.GrayBlues,
    },

    spreadContainer: {
        marginBottom: 20,
    },

    spreadText: {
        fontSize: 18,
    },

    depthSheet: {
        flex: 1,
        width: '100%',
    },
    depthSheetBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    depthSheetSide: {
        width: '50%',
        // aspectRatio: 1,
    },


    depthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    depthHeaderCell: {
        fontSize: 12,
        color: Color.GrayBlues,
    },
});

