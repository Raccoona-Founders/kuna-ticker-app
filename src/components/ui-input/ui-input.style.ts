import { StyleSheet } from 'react-native';
import { Fonts, Color } from 'styles/variables';

export default StyleSheet.create({
    field: {
        marginBottom: 20,
    },
    label: {
        position: 'absolute',
        left: 0,
        top: 8,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: Color.Text,
        fontFamily: Fonts.TTNorms_Medium,

        paddingTop: 30,
        paddingBottom: 10,

        borderBottomWidth: 1,
        borderBottomColor: Color.Gray3,
    },

    description: {
        marginTop: 10,
        color: Color.SecondaryText,
        marginBottom: 20,
        fontSize: 12,
    },
});
