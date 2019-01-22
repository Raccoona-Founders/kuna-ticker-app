import React from 'react';
import { TextInputProps } from 'react-native';
import { Field, FieldProps as FormikFieldProps, FormikProps } from 'formik';
import UIInput from 'components/ui-input';

type FormikInputProps = TextInputProps & {
    name: string;
    label?: string;
    onChange?: (text: string) => any;
    type?: any;
};

export default class FormikInput extends React.PureComponent<FormikInputProps> {
    public render(): JSX.Element {
        return <Field name={this.props.name} render={this.__render} />;
    }

    protected __render = ({ field, form }: FormikFieldProps) => {
        const { name, onChange, onChangeText, label, ...inputProps } = this.props;
        const value: string | undefined = form.values[field.name] as string;
        const errorMessage: string | undefined = form.errors[field.name] as string;

        return (
            <UIInput
                {...inputProps}
                value={value}
                error={errorMessage}
                label={label}
                onChangeText={this.__onChangeText(form)}
            />
        );
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
