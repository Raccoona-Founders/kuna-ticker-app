import React from 'react';
import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { Color, DefaultStyles } from 'styles/variables';

type MDMessageProps = {
    content: string;
};

export default (props: MDMessageProps) => {
    return <Markdown style={mdStyles}>{props.content}</Markdown>;
};

export const mdStyles = StyleSheet.create({
    root: {
        marginTop: 0,
        marginBottom: 0,
    },
    view: {},
    text: {
        ...DefaultStyles.mediumFont,
        fontSize: 16,
        lineHeight: 24,
        color: Color.Text,
    },
    link: {
        color: Color.DeepBlue,
    },
});
