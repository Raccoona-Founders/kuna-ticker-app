import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

const styles = StyleSheet.create({
    modeButtonsBox: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    modeButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: Color.White,

        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '700',
        overflow: 'hidden',
        opacity: 0.5,
    },
    modeButtonBuy: {
        borderColor: Color.Main,
        color: Color.Main,
    },
    modeButtonSell: {
        borderColor: Color.Danger,
        color: Color.Danger,
    },

    modeButtonActive: {
        opacity: 1,
    },
});

export default styles;
