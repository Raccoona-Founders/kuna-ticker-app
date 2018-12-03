import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanTest from 'components/span-text';

const riddle = require('./riddle.json');

type RiddleProps = {
    index: number;
};

type Riddle = {
    story: string;
    question: string;
    prize_prefix: string;
    answer: string;
    answer_md5: string;
    prize: string;
};

export const RiddleQuestion = (props: RiddleProps) => {
    const currentRiddle: Riddle = riddle.riddles[props.index];

    if (!currentRiddle) {
        return <View />;
    }

    return (
        <View style={styles.container}>
            <SpanTest style={styles.storyText}>{currentRiddle.story}</SpanTest>
            <SpanTest style={styles.questionText}>{currentRiddle.question}</SpanTest>

            <SpanTest>{currentRiddle.prize_prefix}</SpanTest>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},

    storyText: {
        marginBottom: 20,
    },

    questionText: {
        fontWeight: 'bold',
    },
});
