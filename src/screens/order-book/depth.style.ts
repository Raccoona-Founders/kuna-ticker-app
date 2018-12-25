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
        justifyContent: 'space-between',
        // alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },

    spreadValueBox: {
        alignItems: 'center',
    },
    spreadValue: {},
    spreadPercentage: {
        marginLeft: 5,
        fontSize: 12,
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
    },
    depthSheetSide: {
        width: '50%',
        // aspectRatio: 1,
    },

    groupingButtonContainer: {
        flexDirection: 'row',
    },
    groupingContainer: {
        alignItems: 'flex-end',
    },
    groupingValue: {
        marginBottom: 5,
    },

    groupingButton: {
        marginLeft: 10,
        height: 28,
        width: 28,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: Color.Gray3,
    },
    groupingButtonText: {
        fontSize: 18,
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

