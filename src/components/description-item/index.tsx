import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';

type DescriptionItemProps = {
    topic: string;
    children: string | JSX.Element | JSX.Element[];
    contentStyle?: any;
};

export default (props: DescriptionItemProps) => {
    return (
        <View style={styles.body}>
            <SpanText style={styles.topic}>{props.topic}</SpanText>
            {typeof props.children === 'string' ? (
                <SpanText style={styles.text}>{props.children}</SpanText>
            ) : (
                <View style={[styles.content, props.contentStyle]}>{props.children}</View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        marginBottom: 30,
    },
    topic: {
        fontSize: 14,
        color: Color.SecondaryText,
        marginBottom: 5,
    },
    text: {
        fontSize: 18,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
