import { StyleSheet } from 'react-native';
import { Color, DefaultStyles, Fonts } from 'styles/variables';
import Constants from 'utils/constants';

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
    },
    baseBackground: {
        flex: 1,
        backgroundColor: Color.Main,
    },
});

export const tabBarStyles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: Constants.IS_IPHONE_X ? 50 : 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255, 0.9)',
        borderTopWidth: 1,
        borderTopColor: Color.GrayLight,
    },

    tabBar: {
        height: 40,
        flexDirection: 'row',
    },
    tabBtn: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    tab: {
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: 60,
        top: 0,
    },
    text: {
        fontSize: 28,
        fontFamily: Fonts.TTNorms_Regular,
        alignItems: 'center',
        color: Color.Text,
        ...DefaultStyles.boldFont,
    },

    // Info bar
    infoBar: {
        height: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',

        borderBottomWidth: 1,
        borderBottomColor: Color.Gray3,
    },


    betaLabel: {
        color: Color.Main,
        position: 'absolute',
        top: -8,
        right: -24,
        fontSize: 12,
        ...DefaultStyles.boldFont,
    },
});