import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import SpanText from 'components/span-text';
import Label from 'components/label';

import styles from './ui-input.style';

type InputProps = TextInputProps & {
    label?: string;
    error?: string;
    type?: 'email' | 'password' | 'digits' | 'number' | 'name';
};


export default class UIInput extends React.PureComponent<InputProps> {
    public render(): JSX.Element {
        const { label, error, ...textInputProps } = this.props;

        const inputTypeProps = this._getInputPropsByType();
        const withLabel = Boolean(label);
        const withError = Boolean(error);

        return (
            <View style={styles.field}>
                {withLabel ? <Label style={styles.label}>{this.props.label}</Label> : undefined}
                <TextInput
                    {...inputTypeProps}
                    {...textInputProps}
                    style={styles.input}
                />
                {withError ? <SpanText>{error}</SpanText> : undefined}
            </View>
        );
    }

    protected _getInputPropsByType = (): Partial<TextInputProps> => {
        switch (this.props.type) {
            case 'email':
                return {
                    autoCorrect: false,
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                };

            case 'password':
                return {
                    autoCorrect: false,
                    secureTextEntry: true,
                    autoCapitalize: 'none',
                };

            case 'digits':
                return { keyboardType: 'phone-pad' };

            case 'number':
                return { keyboardType: 'numeric' };

            case 'name':
                return { autoCorrect: false };

            default:
                return {};
        }
    };
}
