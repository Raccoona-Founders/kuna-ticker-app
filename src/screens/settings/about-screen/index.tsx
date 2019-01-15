import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import qs from 'querystring';
import { SpanText } from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import Analytics from 'utils/ga-tracker';
import i18n, { _ } from 'utils/i18n';
import { styles, mdStyles } from './about-screen.style';
import textContent from './text-content';
import Topic from 'components/topic';

const language: string = i18n.currentLocale().split('-')[0];


type LinkItem = {
    title: string;
    label: string;
    url: string;
    disabled?: boolean;
};

type SettingsProps = mobx.user.WithUserProps;


const links: LinkItem[] = [{
    title: _('about.github'),
    label: 'CoinWizard/kuna-ticker-app',
    url: 'https://github.com/CoinWizard/kuna-ticker-app',
}, {
    title: _('about.roadmap'),
    label: 'Trello Board',
    url: 'https://trello.com/b/9k4PHBO4/kuna-tiker-roadmap',
}, {
    title: _('about.website'),
    label: 'coinwizard.github.io/kuna-ticker-app',
    url: 'https://coinwizard.github.io/kuna-ticker-app?ref=application',
    disabled: true,
}, {
    title: _('about.telegram'),
    label: '@MaksymTymchyk',
    url: 'https://t.me/MaksymTymchyk',
}, {
    title: _('about.email'),
    label: 'maksym.tymchyk@gmail.com',
    url: `mailto:maksym.tymchyk@gmail.com?${qs.stringify({ subject: 'Kuna Ticker' })}`,
}];


export default class AboutScreen extends React.Component<SettingsProps> {
    public render(): JSX.Element {
        return (
            <ShadeScrollCard>
                <Topic title={_('about.title')} />

                <View style={styles.body}>
                    <Markdown style={mdStyles}>{textContent[language] || textContent.en}</Markdown>
                    <View style={styles.separator} />
                    <View style={styles.linksContainer}>{links.map(this.__renderLinkItem)}</View>
                </View>
            </ShadeScrollCard>
        );
    }

    private __renderLinkItem = (item: LinkItem, index: number) => {
        const { title, url, label, disabled = false } = item;

        if (disabled) {
            return <View key={index} />;
        }

        return (
            <TouchableOpacity key={index} onPress={this.__linkTo(url, title)} style={styles.linkItem}>
                <SpanText style={styles.linkItemTitle}>{title}</SpanText>
                <SpanText style={styles.linkItemLabel}>{label}</SpanText>
            </TouchableOpacity>
        );
    };

    private __linkTo = (url: string, title: string) => {
        return async () => {
            const can = await Linking.canOpenURL(url);

            if (can) {
                Analytics.logEvent('open_link', {
                    title: title,
                });

                Linking.openURL(url);
            }
        };
    };
}
