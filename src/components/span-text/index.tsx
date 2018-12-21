import React from 'react';
import { Text, TextProps } from 'react-native';
import { Color, Fonts } from 'styles/variables';

type RegularTextProps = TextProps & {
    children: 'string' | any;
    weight?: '400' | '500' | '600' | '700';
    fontSize?: number;
};


export const SpanText = (props: RegularTextProps) => {
    const { weight = '500', style = {}, fontSize = 16, children, ...otherProps } = props;
    const textStyles: any[] = [
        defaultStyle, {
            fontSize: fontSize,
            fontWeight: weight,
        },
        style,
    ];

    return <Text {...otherProps} style={textStyles}>{children}</Text>;
};

const defaultStyle = {
    fontFamily: Fonts.TTNorms_Regular,
    color: Color.Text,
};

export default SpanText;
