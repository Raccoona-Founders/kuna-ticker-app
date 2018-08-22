import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Color } from 'styles/variables';

type TopicProps = {
    title: string;
    leftContent?: any;
    rightContent?: any;
};

export const Topic = (props: TopicProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <View style={styles.titleAreaSide}>{props.leftContent}</View>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={styles.titleAreaSide}>{props.rightContent}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: Color.Background,
        borderBottomWidth: 1,
        borderBottomColor: Color.TextSecondary,
    },
    titleArea: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 16,
        textAlign: 'center',
        color: Color.Dark,
    },
    titleAreaSide: {
        width: 70,
    }
});