import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    preBox: {
        backgroundColor: Color.GrayLight,
        borderRadius: 3,
        padding: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },

    topic: {
        fontSize: 28,
        marginBottom: 10,
        ...DefaultStyles.boldFont,
    },
});
