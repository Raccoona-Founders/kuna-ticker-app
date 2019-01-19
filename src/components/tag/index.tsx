import SpanText from 'components/span-text';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import { Color } from 'styles/variables';

type TagProps = {
    children: string;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
};

export default (props: TagProps) => (
    <View style={[styles.tag, props.style]}>
        <SpanText style={[styles.tagText, props.styleText]}>{props.children}</SpanText>
    </View>
);

const styles = StyleSheet.create({
    tag: {
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tagText: {
        fontSize: 12,
        color: Color.White,
    },
});