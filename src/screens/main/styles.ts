import { StyleSheet } from 'react-native';
import { Color, DefaultStyles, Fonts } from 'styles/variables';
import Constants from 'utils/constants';

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.NewMilkBlue,
    },
    baseBackground: {
        flex: 1,
        backgroundColor: Color.NewMilkBlue,
    },
});

export const tabBarStyles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: Constants.IS_IPHONE_X ? 30 : 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: Color.White,

        shadowOpacity: 0.4,
        shadowColor: Color.CommonShadowColor,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 3,
    },

    tabBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {
        alignItems: 'center',
    },
    text: {
        marginTop: 5,
        fontFamily: Fonts.TTNorms_Regular,
        fontSize: 12,
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
});