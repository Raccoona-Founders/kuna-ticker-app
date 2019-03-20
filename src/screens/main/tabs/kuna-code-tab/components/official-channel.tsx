import React from 'react';
import SpanText from 'components/span-text';
import TelegramLink from 'components/telegram-link';
import { StyleSheet, View } from 'react-native';
import { Color } from 'styles/variables';

export default () => {
    return (
        <View style={styles.box}>
            <SpanText style={styles.label}>Telegram</SpanText>
            <View style={styles.linkList}>
                <TelegramLink telegram="@kunacode" style={styles.linkStyle} />
                <TelegramLink telegram="@kunacodebot" style={styles.linkStyle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    label: {
        fontSize: 16,
        marginRight: 20,
    },

    linkList: {
        flexDirection: 'row',
    },

    linkStyle: {
        marginLeft: 20,
        fontSize: 16,
        color: Color.Main,
    },
});
