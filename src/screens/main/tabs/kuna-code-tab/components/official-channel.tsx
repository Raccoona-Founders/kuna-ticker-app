import React from 'react';
import SpanText from 'components/span-text';
import TelegramLink from 'components/telegram-link';
import { StyleSheet, View } from 'react-native';
import { _ } from 'utils/i18n';
import { Color } from 'styles/variables';

export default () => {
    return (
        <View style={styles.box}>
            <SpanText>{_('kuna-code.channel-title')}: </SpanText>
            <TelegramLink telegram="@kunacode" style={styles.linkStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    linkStyle: {
        color: Color.Main,
    },
});
