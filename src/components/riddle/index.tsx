/**
 * @deprecated
 *
 * It's file describe first three riddles.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';
import RiddleConfig, { Riddle } from './riddle-config';
import RiddleChecker from 'components/riddle/riddle-checker';
import { DefaultStyles } from 'styles/variables';


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
        ...DefaultStyles.thinFont,
        marginBottom: 20,
        fontSize: 18,
    },
    questionText: {
        ...DefaultStyles.mediumFont,
        fontSize: 18,
    },
});

const riddleChecker = new RiddleChecker();
const riddleList = RiddleConfig.riddles;

export { riddleList, Riddle, riddleChecker };
