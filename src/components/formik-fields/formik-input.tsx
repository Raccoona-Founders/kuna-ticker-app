import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Field, FieldProps as FormikFieldProps, FormikProps } from 'formik';
import SpanText from 'components/span-text';

import styles from './formik-input.style';

type FormikInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    onChange?: (text: string) => any;
    type?: string;
};

export default class FormikInput extends React.PureComponent<FormikInputProps> {
    public render(): JSX.Element {
        return <Field name={this.props.name} render={this.__render} />;
    }

    protected __render = ({ field, form }: FormikFieldProps) => {
        const errorMessage = form.errors[field.name];
        const inputProps = this._getInputPropsByType();

        const withLabel = Boolean(this.props.label);

        return (
            <View style={styles.field}>
                {withLabel ? <SpanText style={styles.label}>{this.props.label}</SpanText> : undefined}
                <TextInput
                    {...inputProps}
                    style={styles.input}
                    value={field.value}
                    onChangeText={this.__onChangeText(form)}
                    placeholder={this.props.placeholder}
                />

                {errorMessage ? <SpanText>{errorMessage}</SpanText> : undefined}
            </View>
        );
    };

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

    protected __onChangeText = (form: FormikProps<any>) => {
        return (text: string) => {
            form.setFieldValue(this.props.name, text);
            if (this.props.onChange) {
                this.props.onChange(text);
            }
        };
    };
}
