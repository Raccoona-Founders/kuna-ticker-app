import React from 'react';
import { View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import Markdown from 'react-native-markdown-renderer';
import qs from 'querystring';
import { SpanText } from 'components/span-text';
import Analytics from 'utils/ga-tracker';
import i18n, { _ } from 'utils/i18n';
import { styles, mdStyles } from './setting-tab.style';
import textContent from './text-content';
import { Color } from 'styles/variables';

const language: string = i18n.currentLocale().split('-')[0];


type LinkItem = {
    title: string;
    label: string;
    url: string;
    disabled?: boolean;
};

type SettingsProps = MobxUser.WithUserProps;


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


@inject('User')
export default class SettingTab extends React.Component<SettingsProps> {
    public render(): JSX.Element {
        const { User } = this.props;

        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.topic}>
                        <SpanText style={styles.topicTitle}>{_('about.title')}</SpanText>
                    </View>

                    <SpanText>{}</SpanText>

                    <Markdown style={mdStyles}>{textContent[language] || textContent.en}</Markdown>
                </View>

                <View style={styles.separator} />

                <View style={styles.linksContainer}>
                    {links.map((item: LinkItem, index: number) => {
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
                    })}
                </View>

                <View style={styles.separator} />

                <SpanText style={{ marginBottom: 20, fontSize: 12, color: Color.GrayBlues }}>
                    User ID: {User.userId}
                </SpanText>
            </ScrollView>
        );
    }

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
