import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SpanText } from 'components/span-text';
import { styles } from 'screens/market/calculator/calculator.style';
import { _ } from 'utils/i18n';

type RippleNoticeProps = {
    style?: StyleProp<ViewStyle>;
};

export default (props: RippleNoticeProps) => (
    <View style={[style.rippleNotice, props.style]}>
        <SpanText style={{ textAlign: 'center', paddingBottom: 10 }}>💩💩💩💩💩</SpanText>

        <SpanText style={style.rippleNoticeText}>
            <SpanText style={styles.topic}>{_('notice.ripple')} 👌🏾</SpanText>
        </SpanText>
    </View>
);

const style = StyleSheet.create({
    rippleNotice: {
        margin: 20,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,

        borderRadius: 6,
        backgroundColor: '#FFFCEF',

        borderWidth: 0.5,
        borderColor: '#FFECA9',

        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
    },

    rippleNoticeText: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '500',
        color: '#6F5D0B',
        textAlign: 'center',
    },
});
