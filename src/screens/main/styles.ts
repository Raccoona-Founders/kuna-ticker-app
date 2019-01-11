import { StyleSheet } from 'react-native';
import { Color, Fonts } from 'styles/variables';
import Constants from 'utils/constants';

export const mainStyles = StyleSheet.create({
    swiperWrapper: {},
    container: {
        flex: 1,
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
        paddingTop: Constants.IS_IPHONE_X ? 40 : 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },

    tabBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    tabBtn: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    tab: {
        position: 'absolute',
        height: 60,
        top: 0,
    },
    text: {
        fontSize: 28,
        fontFamily: Fonts.TTNorms_Regular,
        alignItems: 'center',
        color: Color.Text,
        fontWeight: '700',
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