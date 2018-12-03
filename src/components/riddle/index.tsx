import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanTest from 'components/span-text';
import RiddleConfig, { Riddle } from './riddle-config';

type RiddleProps = {
    index: number;
};

export const RiddleQuestion = (props: RiddleProps) => {
    const currentRiddle: Riddle = RiddleConfig.riddles[props.index];

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
