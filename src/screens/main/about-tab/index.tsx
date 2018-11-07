import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { Color, Fonts } from 'styles/variables';
import { SpanText } from 'components/span-text';
import { textContent } from './text-content';


const links = [{
    title: 'GitHub Repository',
    url: 'https://github.com/CoinWizard/mobile-ticker-for-kuna',
}, {
    title: 'Kuna Ticker Website',
    url: 'https://github.com/CoinWizard/mobile-ticker-for-kuna',
}, {
    title: 'Telegram',
    url: 'https://t.me/MaksymTymchyk',
}, {
    title: 'Email',
    url: 'mailto:maksym.tymchyk@gmail.com?subject=KunaTicker',
}];


const AboutTab = () => {
    const linkTo = (url: string) => {
        return async () => {
            const can = await Linking.canOpenURL(url);
            if (can) {
                Linking.openURL(url);
            }
        };
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.topic}>
                    <SpanText style={styles.topicTitle}>About Kuna Ticker</SpanText>
                </View>

                <Markdown style={mdStyles}>{textContent}</Markdown>
            </View>

            <View style={styles.linksContainer}>
                {links.map(({ title, url }) => {
                    return (
                        <TouchableOpacity onPress={linkTo(url)} style={styles.linkItem}>
                            <SpanText style={styles.linkItemText}>→ {title}</SpanText>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};


const mdStyles = StyleSheet.create({
    root: {},
    view: {},
    text: {
        fontSize: 16,
        lineHeight: 20,
        color: Color.DarkPurple,
        fontFamily: Fonts.TTNorms_Regular,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    topic: {
        marginTop: 10,
        marginBottom: 20,
    },
    topicTitle: {
        color: Color.DarkPurple,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
    },
    linksContainer: {
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
    },
    linkItem: {
        marginBottom: 20,
    },
    linkItemText: {
        fontSize: 18,
        fontWeight: '500'
    },
});

export default AboutTab;
