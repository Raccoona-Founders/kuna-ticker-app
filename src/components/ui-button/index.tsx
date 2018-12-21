import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';

export type UIButtonProps = TouchableOpacityProps & {
    children: string | number | any;
    type?: 'small';
};

const UIButton = (props: UIButtonProps) => {
    const btnStyle = [
        styles.button,
        props.type === 'small' ? styles.smallBtn : styles.defaultBtn,
        props.style || {},
    ];

    const textStyle = [
        styles.buttonText,
        props.type === 'small' ? styles.smallText : styles.defaultText,
    ];

    return (
        <TouchableOpacity onPress={props.onPress} style={btnStyle}>
            <SpanText style={textStyle}>{props.children}</SpanText>
        </TouchableOpacity>
    );
};

export default UIButton;

const styles = StyleSheet.create({
    button: {
        borderColor: Color.Gray3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
    },
    defaultBtn: {
        height: 50,
        width: '100%',
    },
    smallBtn: {
        height: 34,
        width: '100%',
    },



    buttonText: {
        color: Color.DarkPurple,
        textTransform: 'uppercase',
    },
    smallText: {
        fontSize: 12,
    },
    defaultText: {
        fontSize: 16,
    },
});
