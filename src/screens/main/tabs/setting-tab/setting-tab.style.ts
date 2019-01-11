import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },

    separator: {
        marginTop: 20,
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
    },
});
