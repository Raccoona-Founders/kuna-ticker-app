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

    const onPress = async () => {
        props.onPress && props.onPress();

        const domain = props.telegram.replace('@', '');

        const tgURL = `tg://resolve?domain=${domain}`;
        const httpURL = `https://t.me/${domain}`;

        const canOpen = await Linking.canOpenURL(tgURL);

        Linking.openURL(canOpen ? tgURL : httpURL);
    };

    return (
        <TouchableOpacity onPress={onPress} style={props.boxStyle}>
            <SpanText style={props.style}>{props.title ? props.title : props.telegram}</SpanText>
        </TouchableOpacity>
    );
};
