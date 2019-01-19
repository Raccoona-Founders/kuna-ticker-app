import React from 'react';
import { shuffle } from 'lodash';
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

import styles from './create-offer.style';


const JOCK_MESSAGES = [
    'From $3 000 to $20 000 just one moment',
    'Just buy it!',
    'Just sell it!',
    'Just hold it!',
    'Hamsters are your hope',
    'Holy nakamoto! What happened to Bitcoin?',
    'Buy or not to Buy? That is the question!',
    'Sell or not to Sell? That is the question!',
    'Hold or not to Hold? That is the question!',
    'I bought Ripple for all my salary.',
    'I bought for 18k.',
];

type CreateOfferValues = {
    amount: string;
    currency: string;
    comment: string;
    side: string;
    fee: number;
};

const formicProps: WithFormikConfig<CreateOfferProps, CreateOfferValues> = {
    mapPropsToValues: (): CreateOfferValues => {
        return {
            amount: '10000',
            currency: 'UAH',
            side: 'sell',
            comment: '',
            fee: 0.005,
        };
    },
    handleSubmit: async (values: CreateOfferValues, formikBag: FormikBag<CreateOfferProps, CreateOfferValues>) => {
        formikBag.setStatus(values);
    },
};

type CreateOfferProps
    = InjectedFormikProps<object, CreateOfferValues>
    & mobx.kunacode.WithKunaCodeProps
    & mobx.user.WithUserProps;


// @ts-ignore
@compose(inject('KunaCode', 'User'), withFormik(formicProps), observer)
export default class CreateOfferScreen extends React.Component<CreateOfferProps> {

    private readonly jockMessage: string;

    public constructor(props: CreateOfferProps) {
        super(props);

        this.jockMessage = shuffle(JOCK_MESSAGES)[0];
    }

    public componentDidMount(): void {
        AnalTracker.logEvent('kuna_code_start_create_offer');
    }

    public render(): JSX.Element {
        const { User } = this.props;

        return (
            <ShadeScrollCard renderFooter={this.__renderFooter}>
                <Topic title="Create offer"
                       description="Describe what the KUNA Code you want to Buy or Sell"
                />

                <View style={styles.body}>
                    <Formik.FormikInput name="amount"
                                        placeholder="10 000"
                                        label="Enter your amount"
                                        type="number"
                    />

                    <Formik.FormikInput name="currency"
                                        label="Choose currency"
                                        placeholder="UAH"
                    />

                    <View>
                        <SpanText>{User.displayName}</SpanText>
                        <SpanText>{User.telegram}</SpanText>
                    </View>

                    <SpanText>{JSON.stringify(this.props.status)}</SpanText>
                </View>
            </ShadeScrollCard>
        );
    }

    private __renderFooter = () => {
        return (
            <View style={styles.footer}>
                <View style={styles.footerTextBox}>
                    <SpanText numberOfLines={3} style={styles.footerText}>{this.jockMessage}</SpanText>
                </View>

                <UIButton type="small"
                          onPress={this.props.submitForm}
                          style={styles.submitButton}
                          textStyle={styles.submitButtonText}
                >Create</UIButton>
            </View>
        );
    };
}
