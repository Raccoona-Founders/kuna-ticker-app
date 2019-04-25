import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    preBox: {
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

    topic: {
        fontSize: 28,
        marginBottom: 10,
        ...DefaultStyles.boldFont,
    },
});
