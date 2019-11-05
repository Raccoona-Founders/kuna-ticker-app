import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';

export type IconButtonProps = TouchableOpacityProps & {
    icon: string;
    title: string | number | any;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    forcePressEnabled?: boolean;
};

export default class UIIconButton extends React.PureComponent<IconButtonProps> {
    public static defaultProps: Partial<IconButtonProps> = {
        onPress: () => console.log('Please attach a method to this component'),
        disabled: false,
        forcePressEnabled: false,
    };


    public render(): JSX.Element {
        const { onPress, title, icon, disabled, forcePressEnabled } = this.props;

        const enabledPress
            = forcePressEnabled
            || false === disabled;

        return (
            <TouchableOpacity onPress={enabledPress ? onPress : undefined} style={styles.container}>
                <Icon name={icon}
                      size={16}
                      style={[styles.icon, disabled ? styles.iconDisabled : {}]}
                />

                <SpanText style={[styles.title, disabled ? styles.titleDisabled : {}]}>
                    {title}
                </SpanText>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        marginBottom: 5,
        color: Color.Text,
    },

    title: {
        fontSize: 14,
        color: Color.Text,
    },

    iconDisabled: {
        color: Color.SecondaryText,
    },
    titleDisabled: {
        color: Color.SecondaryText,
    }
});
