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
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Color.Text,
    },
    descriptionText: {
        fontSize: 16,
    },
});

export default Topic;
