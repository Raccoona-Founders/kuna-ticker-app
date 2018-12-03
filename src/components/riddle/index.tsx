import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';
import RiddleConfig, { Riddle } from './riddle-config';
import RiddleChecker from 'components/riddle/riddle-checker';


type RiddleProps = {
    index: number;
    riddle: Riddle;
};

export const RiddleQuestion = (props: RiddleProps) => {
    const currentRiddle: Riddle = props.riddle;

    return (
        <View style={styles.container}>
            <SpanText style={styles.storyText}>{currentRiddle.story}</SpanText>
            <SpanText style={styles.questionText}>{currentRiddle.question}</SpanText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    storyText: {
        marginBottom: 20,
        fontWeight: '400',
        fontSize: 18,
    },
    questionText: {
        fontWeight: '500',
        fontSize: 18,
    },
});

const riddleChecker = new RiddleChecker();
const riddleList = RiddleConfig.riddles;

export { riddleList, Riddle, riddleChecker };
