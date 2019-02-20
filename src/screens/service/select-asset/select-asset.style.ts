import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

export default StyleSheet.create({
    row: {
        height: 55,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    coinInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    coinIcon: {},
    coinTitle: {
        fontSize: 18,
        marginLeft: 10,
    },
    coinTitleEmpty: {
        marginLeft: 10,
    },

    separator: {
        borderTopWidth: 1,
        borderTopColor: Color.GrayLight,
        marginLeft: 20,
        marginRight: 20,
    },
});