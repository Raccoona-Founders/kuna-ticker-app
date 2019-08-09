import { StyleSheet } from 'react-native';
import { DefaultStyles } from 'styles/variables';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    preBox: {
        marginBottom: 10,
        marginTop: 20,
        marginHorizontal: 20,
    },

    topic: {
        fontSize: 28,
        marginBottom: 10,
        ...DefaultStyles.boldFont,
    },
});
