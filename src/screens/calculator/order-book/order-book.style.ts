import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

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
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '700',
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
