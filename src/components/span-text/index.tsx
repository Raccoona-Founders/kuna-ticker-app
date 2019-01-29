import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Color, Fonts } from 'styles/variables';

type RegularTextProps = TextProps & {
    children: string | any;
};

export const SpanText = (props: RegularTextProps) => {
    const { style = {}, children, ...otherProps } = props;
    const textStyles: any[] = [defaultStyle, style];

    return (
        <Text {...otherProps} style={StyleSheet.flatten(textStyles)}>
            {children}
        </Text>
    );
};

const defaultStyle = {
    fontFamily: Fonts.TTNorms_Medium,
    color: Color.Text,
};

export default SpanText;
