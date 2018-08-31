import { StyleSheet } from 'react-native';
import { Color } from "styles/variables";

export const mainStyles = StyleSheet.create({
    swiperWrapper: {},
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
});

export const quoteAssetsStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        height: 60,
        alignItems: 'center',
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        marginRight: 30,
    },
    linkActive: {
    },
    text: {
        fontSize: 18,
        color: Color.TextDarkSecondary,
    },
    textActive: {
        color: Color.Primary
    },
});