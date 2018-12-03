import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';
import RiddleConfig, { Riddle } from './riddle-config';
import { Color } from 'styles/variables';

type RiddleProps = {
    index: number;
};

export const RiddleQuestion = (props: RiddleProps) => {
    const currentRiddle: Riddle = RiddleConfig.riddles[props.index];

    if (!currentRiddle) {
        return <View><SpanText>{JSON.stringify(typeof props.index)}</SpanText></View>;
    }

    return (
        <View style={styles.container}>
            <View>
                <SpanText style={styles.storyText}>{currentRiddle.story}</SpanText>
                <SpanText style={styles.questionText}>{currentRiddle.question}</SpanText>
            </View>

            <View style={styles.codeContainer}>
                <SpanText style={styles.codeTopic}>Проверь Kuna Codе, вдруг кто-то тебя опередели!</SpanText>
                <View style={styles.codePrefixContainer}>
                    <SpanText style={styles.codePrefix}>{currentRiddle.prize_prefix}</SpanText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'space-between',
    },

    storyText: {
        marginBottom: 20,
    },

    questionText: {
        fontWeight: 'bold',
    },

    codeContainer: {
        marginTop: 20,
        marginBottom: 20,
    },

    codeTopic: {
        fontSize: 12,
        color: Color.Gray2
    },
    codePrefixContainer: {
        padding: 10,
        marginTop: 10,
        backgroundColor: Color.Gray,
        borderRadius: 5
    },
    codePrefix: {
        fontSize: 18,
        textAlign: 'center',
    },
});
