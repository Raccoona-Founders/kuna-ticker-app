import React from 'react';
import { View } from 'react-native';
import { withFormik, InjectedFormikProps, WithFormikConfig, FormikBag } from 'formik';
import { inject, observer } from 'mobx-react/native';
import { ShadeScrollCard } from 'components/shade-navigator';
import AnalTracker from 'utils/ga-tracker';
import Topic from 'components/topic';
import Formik from 'components/formik-fields';
import { compose } from 'recompose';
import UIButton from 'components/ui-button';
import SpanText from 'components/span-text';


type CreateOfferValues = {
    name: string;
    amount: string;
    currency: string;
};

const formicProps: WithFormikConfig<CreateOfferProps, CreateOfferValues> = {
    mapPropsToValues: (): CreateOfferValues => {
        return {
            name: '',
            amount: '10000',
            currency: 'UAH',
        };
    },
    handleSubmit: async (values: CreateOfferValues, formikBag: FormikBag<CreateOfferProps, CreateOfferValues>) => {
        formikBag.setStatus(values);
    },
};

type CreateOfferProps
    = InjectedFormikProps<object, CreateOfferValues>
    & mobx.kunacode.WithKunaCodeProps;


// @ts-ignore
@compose(inject('KunaCode'), withFormik(formicProps), observer)
export default class CreateOfferScreen extends React.Component<CreateOfferProps> {

    public componentDidMount(): void {
        AnalTracker.logEvent('kuna_code_start_create_offer');
    }

    public render(): JSX.Element {
        return (
            <ShadeScrollCard>
                <Topic title="Create offer"
                       description="Your personal offer to Buy or Sell KUNA Code!"
                />

                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <Formik.FormikInput name="name"
                                        placeholder="Your name"
                                        label="Your name"
                    />

                    <Formik.FormikInput name="amount"
                                        placeholder="Amount"
                                        label="Choose amount"
                                        type="number"
                    />

                    <Formik.FormikInput name="currency"
                                        placeholder="Currency"
                                        label="Choose currency"
                    />

                    <SpanText>{JSON.stringify(this.props.status)}</SpanText>

                    <UIButton onPress={this.props.submitForm}>Submit</UIButton>
                </View>
            </ShadeScrollCard>
        );
    }
}
