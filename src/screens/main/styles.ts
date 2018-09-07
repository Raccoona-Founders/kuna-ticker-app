import { StyleSheet } from 'react-native';
import { Color } from "styles/variables";

export const mainStyles = StyleSheet.create({
    swiperWrapper: {},
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        backgroundColor: Color.Background,
    },
});

export const tabBarStyles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    tabBar: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        marginRight: 12,
        marginLeft: 12,
    },
    text: {
        fontSize: 20,
        alignItems: 'center',
        color: Color.TextSecondary,
        fontWeight: '600',
    },

    // Info bar
    infoBar: {
        height: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',

        borderBottomWidth: 1,
        borderBottomColor: Color.BorderLight,
    },
});