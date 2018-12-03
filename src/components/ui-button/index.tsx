import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';

export type UIButtonProps = TouchableOpacityProps & {
    children: string | number | any;
};

const UIButton = (props: UIButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, ]}>
            <SpanText style={styles.buttonText}>{props.children}</SpanText>
        </TouchableOpacity>
    );
};

export default UIButton;

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        height: 50,
        width: '100%',
        borderColor: Color.Gray3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

    buttonText: {
        color: Color.DarkPurple,
        fontSize: 16,
        textTransform: 'uppercase',
    }
});
