import { StyleSheet } from 'react-native';
import { Color } from "styles/variables";

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    }
});

export const quoteAssetsStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: Color.BorderLight,
        height: 40,
        alignContent: 'center'
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30,
    },
    linkActive: {
        borderBottomWidth: 2,
        borderBottomColor: Color.Primary,
    },
    text: {
        fontSize: 16,
        color: Color.TextDarkSecondary
    },
    textActive: {
        color: Color.Primary
    }
});