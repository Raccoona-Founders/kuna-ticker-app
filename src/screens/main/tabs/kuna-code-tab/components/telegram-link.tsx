import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import SpanText from 'components/span-text';

type TelegramTabProps = {
    telegram: string;
};

export default (props: TelegramTabProps) => {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(`https://t.me/${props.telegram}`)}>
            <SpanText>{props.telegram}</SpanText>
        </TouchableOpacity>
    );
};
