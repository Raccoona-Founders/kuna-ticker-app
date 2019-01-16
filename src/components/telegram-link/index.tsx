import React from 'react';
import { Linking, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import SpanText from 'components/span-text';

type TelegramTabProps = {
    title?: string;
    telegram: string;
    boxStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
};

export default (props: TelegramTabProps) => {

    const onPress = () => {
        props.onPress && props.onPress();

        Linking.openURL(`https://t.me/${props.telegram}`);
    };

    return (
        <TouchableOpacity onPress={onPress} style={props.boxStyle}>
            <SpanText style={props.style}>{props.title ? props.title : props.telegram}</SpanText>
        </TouchableOpacity>
    );
};
