import React from 'react';
import { Linking, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import SpanText from 'components/span-text';

type TelegramTabProps = {
    title?: string;
    telegram: string;
    boxStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
};

export default (props: TelegramTabProps) => {
    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(`https://t.me/${props.telegram}`)}
            style={props.boxStyle}
        >
            <SpanText style={props.style}>{props.title ? props.title : props.telegram}</SpanText>
        </TouchableOpacity>
    );
};
