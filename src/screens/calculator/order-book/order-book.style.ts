import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';

const styles = StyleSheet.create({
    modeButtonsBox: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
    },

    modeButton: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: Color.GrayLight,
        backgroundColor: Color.White,
    },

    modeButtonLabel: {
        ...DefaultStyles.boldFont,
        fontSize: 14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    modeButtonBuyLabel: {
        color: Color.Main
    },
    modeButtonSellLabel: {
        color: Color.Danger
    },

    modeButtonBuyActive: {
        borderColor: Color.Main,
    },
    modeButtonSellActive: {
        borderColor: Color.Danger,
    },
});

export default styles;
