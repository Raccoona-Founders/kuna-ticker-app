import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';

type LabelProps = {
    children: string | any;
    style?: StyleProp<TextStyle>;
};

export default (props: LabelProps) => (
    <SpanText style={styles.label}>{props.children}</SpanText>
);

const styles = StyleSheet.create({
    label: {
        color: Color.GrayBlues,
        fontSize: 14,
    },
});
