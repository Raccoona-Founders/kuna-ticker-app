import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from "styles/variables";

type InfoUnitProps = {
    topic: string;
    value: string;
};

export const InfoUnit = (props: InfoUnitProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.topic}>{props.topic}</Text>
            <Text style={styles.value}>{props.value}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        marginBottom: 20
    },
    topic: {
        color: Color.TextSecondary,
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: 5
    },
    value: {
        fontSize: 18,
    }
});
