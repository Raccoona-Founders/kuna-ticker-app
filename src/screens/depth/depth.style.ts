import { StyleSheet } from 'react-native';
import { vw } from 'utils/helper';

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
    },
    topicTitle: {
        fontSize: 24,
    },

    depthSheet: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingBottom: 30,
    },
    depthSheetSide: {
        width: vw(50) - 30,
        // aspectRatio: 1,
    },
});

