import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Color } from 'styles/variables';

type TopicProps = {
    title?: React.ReactNode;
    leftContent?: any;
    rightContent?: any;
};

export const Topic = (props: TopicProps) => {
    return (
        <View style={topicStyles.container}>
            <View style={topicStyles.titleArea}>
                <View style={topicStyles.titleAreaSide}>{props.leftContent}</View>
                <View style={topicStyles.titleText}>{props.title}</View>
                <View style={topicStyles.titleAreaSide}>{props.rightContent}</View>
            </View>
        </View>
    );
};

export const topicStyles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: Color.Background,
    },
    titleArea: {
        paddingLeft: 20,
        paddingRight: 20,
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
    },
});