import React from 'react';
import numeral from 'numeral';
import { shuffle } from 'lodash';
import { View, Slider } from 'react-native';
import { compose } from 'recompose';
import { withFormik, InjectedFormikProps, WithFormikConfig, FormikBag } from 'formik';
import { inject, observer } from 'mobx-react/native';
import { ShadeScrollCard } from 'components/shade-navigator';
import AnalTracker from 'utils/ga-tracker';
import Topic from 'components/topic';
import Label from 'components/label';
import Formik from 'components/formik-fields';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';

import Successful from './components/successful';
import Selector from './components/selector';
import styles from './create-offer.style';


const JOCK_MESSAGES = [
    'From $20 000 to $3 000 just one moment',
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
    side: 'sell' | 'buy';
    commission: number;
};

const formicProps: WithFormikConfig<CreateOfferProps, CreateOfferValues> = {
    mapPropsToValues: (): CreateOfferValues => {
        return {
            amount: '10000',
            currency: 'UAH',
            side: 'sell',
            comment: '',
            commission: 0,
        };
    },
    handleSubmit: async (values: CreateOfferValues, formikBag: FormikBag<CreateOfferProps, CreateOfferValues>) => {
        if (formikBag.props.isSubmitting) {
            return;
        }

        formikBag.setSubmitting(true);

        const { KunaCode } = formikBag.props;

        try {
            KunaCode.checkUserReady();
        } catch (e) {
            formikBag.setSubmitting(false);
            return;
        }

        await formikBag.props.KunaCode.createOffer({
            side: values.side,
            amount: +values.amount,
            currency: values.currency,
            comment: values.comment,
            commission: values.commission,
        });

        formikBag.setSubmitting(false);
        formikBag.setStatus({
            successfulCreated: true,
        });
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
        const { User, values, status = {}, setFieldValue } = this.props;

        const { successfulCreated = false } = status;

        if (successfulCreated) {
            return (
                <ShadeScrollCard>
                    <Successful />
                </ShadeScrollCard>
            );
        }

        const commissionValue: number = values.commission;
        const currencyValue: string = values.currency;
        const sideValue: string = values.side;

        return (
            <ShadeScrollCard renderFooter={this.__renderFooter}>
                <Topic title="Create offer"
                       description="Describe what the KUNA Code you want to Buy or Sell"
                />

                <View style={styles.body}>
                    <Formik.FormikInput
                        name="amount"
                        placeholder="10 000"
                        label="Enter your amount"
                        type="number"
                        returnKeyType="next"
                    />

                    <View  style={{ marginBottom: 20 }}>
                        <Label>Choose currency</Label>
                        <Selector
                            style={{ marginTop: 10 }}
                            selectedValue={currencyValue}
                            items={[
                                { label: 'UAH', value: 'UAH' },
                                { label: 'BTC', value: 'BTC' },
                                { label: 'USD', value: 'USD' },
                                { label: 'RUB', value: 'RUB' },
                            ]}
                            onValueChange={(value: string) => setFieldValue('currency', value)}
                        />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Label>Choose offer side</Label>
                        <Selector
                            style={{ marginTop: 10 }}
                            selectedValue={sideValue}
                            items={[
                                { label: 'Sell', value: 'sell' },
                                { label: 'Buy', value: 'buy' },
                            ]}
                            onValueChange={(value: string) => setFieldValue('side', value)}
                        />
                    </View>

                    <View>
                        <SpanText>Fee: {numeral(commissionValue).format('+0,0.0%')}</SpanText>
                        <Slider minimumValue={-3}
                                maximumValue={3}
                                step={0.1}
                                value={0}
                                onValueChange={this.__handleChangeFee}
                        />
                    </View>

                    {/*<Formik.FormikInput name="comment"*/}
                                        {/*label="Enter Comment of Offer"*/}
                                        {/*placeholder="UAH to Monobank with 1%"*/}
                                        {/*returnKeyType="next"*/}
                                        {/*multiline={true}*/}
                    {/*/>*/}

                    <View>
                        <SpanText>{User.displayName}</SpanText>
                        <SpanText>@{User.telegram}</SpanText>
                    </View>
                </View>
            </ShadeScrollCard>
        );
    }

    private __renderFooter = () => {
        const { isSubmitting } = this.props;

        return (
            <View style={styles.footer}>
                <View style={styles.footerTextBox}>
                    <SpanText numberOfLines={3} style={styles.footerText}>{this.jockMessage}</SpanText>
                </View>

                <UIButton type="small"
                          onPress={isSubmitting ? undefined : this.props.submitForm}
                          style={styles.submitButton}
                          textStyle={styles.submitButtonText}
                >{isSubmitting ? 'Wait' : 'Create'}</UIButton>
            </View>
        );
    };

    private __handleChangeFee = (value: number) => {
        let valueFee = Math.round(value * 100) / 10000;
        this.props.setFieldValue('commission', valueFee);
    };

    private __handleChangeAmount = (value: number) => {
        let valueAmount = Math.round(value);
        this.props.setFieldValue('amount', valueAmount);
    };
}
