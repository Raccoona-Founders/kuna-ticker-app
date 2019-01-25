import React from 'react';
import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { Color, Fonts } from 'styles/variables';

type MDMessageProps = {
    content: string;
};

export default (props: MDMessageProps) => {
    return <Markdown style={mdStyles}>{props.content}</Markdown>;
};

export const mdStyles = StyleSheet.create({
    root: {},
    view: {},
    text: {
        fontSize: 18,
        lineHeight: 20,
        color: Color.Text,
        fontFamily: Fonts.TTNorms_Medium,
    },
});
