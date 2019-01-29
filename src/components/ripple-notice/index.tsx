import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SpanText } from 'components/span-text';
import { _ } from 'utils/i18n';
import { DefaultStyles } from 'styles/variables';

type RippleNoticeProps = {
    style?: StyleProp<ViewStyle>;
};

export default (props: RippleNoticeProps) => (
    <View style={[style.rippleNotice, props.style]}>
        <SpanText style={{ textAlign: 'center', paddingBottom: 10 }}>💩💩💩💩💩</SpanText>

        <SpanText style={style.rippleNoticeText}>
            {_('notice.ripple')} 👌🏾
        </SpanText>
    </View>
);

const style = StyleSheet.create({
    rippleNotice: {
        marginLeft: 20,
        marginRight: 20,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,

        borderRadius: 6,
        backgroundColor: '#FFFCEF',

        borderWidth: 0.5,
        borderColor: '#FFECA9',

        // shadowOffset: { height: 4, width: 0 },
        // shadowRadius: 20,
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
    },

    rippleNoticeText: {
        ...DefaultStyles.mediumFont,
        fontSize: 14,
        lineHeight: 22,
        color: '#6F5D0B',
        textAlign: 'center',
    },
});
