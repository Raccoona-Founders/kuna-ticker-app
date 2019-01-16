import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';

type TopicProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
};

const Topic = (props: TopicProps) => {
    return (
        <View style={styles.container}>
            <SpanText style={styles.titleText}>{props.title}</SpanText>
            {props.description ? <SpanText style={styles.descriptionText}>{props.description}</SpanText> : undefined}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Color.Text,
    },
    descriptionText: {
        fontSize: 16,
        color: Color.GrayBlues,
    },
});

export default Topic;
