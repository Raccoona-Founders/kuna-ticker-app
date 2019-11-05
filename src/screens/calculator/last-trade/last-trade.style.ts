import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

const styles = StyleSheet.create({
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        paddingRight: 15,
    },

    resultUsdValue: {
        fontSize: 16,
        color: Color.SecondaryText,
    },
});

export default styles;
