import React from 'react';
import numeral from 'numeral';
import { shuffle, debounce } from 'lodash';
import { View, Slider, Alert } from 'react-native';
import { compose } from 'recompose';
import { withFormik, InjectedFormikProps, WithFormikConfig, FormikBag } from 'formik';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps } from 'react-navigation';
import RouteKeys from 'router/route-keys';
import AnalTracker from 'utils/ga-tracker';
import { _ } from 'utils/i18n';
import { ShadeScrollCard } from 'components/shade-navigator';
import Topic from 'components/topic';
import Label from 'components/label';
import Formik from 'components/formik-fields';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';
import MDMessage from 'components/md-message';
import Successful from './components/successful';
import Awaiting from './components/awaiting';
import UserInfo from './components/user-info';
import Selector from './components/selector';
import styles from './create-offer.style';


const JOCK_MESSAGES = _('kuna-code.jokes');

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
            amount: '',
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

        const { KunaCode, User } = formikBag.props;

        try {
            KunaCode.checkUserReady();
        } catch (e) {
            formikBag.setSubmitting(false);
            return;
        }

        try {
            await formikBag.props.KunaCode.createOffer({
                side: values.side,
                amount: +values.amount,
                currency: values.currency,
                comment: values.comment,
                commission: values.commission,
            });

            AnalTracker.logEvent('KunaCode_CreateOffer_Success', {
                user_id: User.userId,
                amount: values.amount,
                currency: values.currency,
                type: values.side,
                with_comment: Boolean(values.comment),
            });

            formikBag.setSubmitting(false);
            formikBag.setStatus({
                successfulCreated: true,
            });
        } catch (e) {
            AnalTracker.logEvent('KunaCode_CreateOffer_Error');
        }
    },
};


type CreateOfferProps
    = InjectedFormikProps<object, CreateOfferValues>
    & NavigationInjectedProps
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
        AnalTracker.logEvent('KunaCode_CreateOffer_Start');
    }

    public render(): JSX.Element {
        const { values, status = {}, setFieldValue, isSubmitting } = this.props;

        const { successfulCreated = false } = status;

        if (successfulCreated) {
            return <Successful />;
        }

        if (isSubmitting) {
            return <Awaiting />;
        }

        const currencyValue: string = values.currency;
        const sideValue: string = values.side;

        return (
            <ShadeScrollCard renderFooter={this.__renderFooter}>
                <Topic title={_('kuna-code.create-offer')}
                       description={_('kuna-code.create-offer-description')}
                />

                <View style={styles.body}>
                    <Formik.FormikInput
                        name="amount"
                        placeholder="10 000"
                        label={_('kuna-code.enter-amount')}
                        type="number"
                        returnKeyType="next"
                    />

                    <View style={{ marginBottom: 20 }}>
                        <Label>Choose currency</Label>
                        <Selector
                            style={{ marginTop: 10 }}
                            selectedValue={currencyValue}
                            items={[
                                { label: 'UAH', value: 'UAH' },
                                { label: 'USDT', value: 'USDT' },
                                { label: 'ARUB', value: 'ARUB' },
                            ]}
                            onValueChange={(value: string) => setFieldValue('currency', value)}
                        />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Label>Choose offer type</Label>
                        <Selector
                            style={{ marginTop: 10 }}
                            selectedValue={sideValue}
                            items={[
                                { label: _('kuna-code.sell'), value: 'sell' },
                                { label: _('kuna-code.buy'), value: 'buy' },
                            ]}
                            onValueChange={(value: string) => setFieldValue('side', value)}
                        />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        {this.__renderFeeLabel()}
                        <Slider minimumValue={-3}
                                maximumValue={3}
                                step={0.1}
                                value={0}
                                onValueChange={debounce(this.__handleChangeFee, 50)}
                        />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        {this.__renderCommentField()}
                    </View>

                    <UserInfo />
                </View>
            </ShadeScrollCard>
        );
    }


    private __renderFeeLabel = () => {
        const { values } = this.props;

        const commissionValue: number = values.commission;

        if (!commissionValue) {
            // @TODO translate
            return <SpanText>1 : 1</SpanText>;
        }

        // @TODO translate
        let textTemplate = _('kuna-code.taker-pay');
        if (commissionValue < 0) {
            textTemplate = _('kuna-code.you-pay');
        }

        const comm = numeral(Math.abs(commissionValue));

        return <SpanText>{textTemplate.replace('{value}', comm.format('0,0.0%'))}</SpanText>;
    };


    private __renderFooter = () => {
        const { isSubmitting, User } = this.props;

        const disabled = !User.telegram || !User.displayName;

        return (
            <View style={styles.footer}>
                <View style={styles.footerTextBox}>
                    <SpanText numberOfLines={3} style={styles.footerText}>{this.jockMessage}</SpanText>
                </View>

                {/* @TODO translate */}
                <UIButton small
                          title={_('general.create')}
                          onPress={this.__onCreate}
                          style={styles.submitButton}
                          textStyle={styles.submitButtonText}
                          loading={isSubmitting}
                          disabled={disabled}
                />
            </View>
        );
    };

    private __renderCommentField = () => {
        const { values, setFieldValue } = this.props;
        const comment: string = values.comment;

        if (!comment) {
            // @TODO translate
            return (
                <UIButton
                    small
                    title="Add comment"
                    onPress={this.__editComment}
                />
            );
        }

        // @TODO translate
        return (
            <>
                <Label>Comment</Label>
                <MDMessage content={comment} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <UIButton
                        small
                        white
                        style={{ flex: 1, marginRight: 10 }}
                        title="Remove comment"
                        onPress={() => setFieldValue('comment', '')}
                    />

                    <UIButton
                        small
                        style={{ flex: 1, marginLeft: 10 }}
                        title="Edit comment" onPress={this.__editComment}
                    />
                </View>
            </>
        );
    };


    private __editComment = () => {
        const { navigation, values, setFieldValue } = this.props;

        navigation.push(RouteKeys.Service_EnterText, {
            title: _('kuna-code.enter-comment.title'),
            description: _('kuna-code.enter-comment.description'),
            text: values.comment,
            onSave: (text: string) => setFieldValue('comment', text),
        });
    };


    private __onCreate = () => {
        const { side, amount, currency } = this.props.values;

        const numAmount = numeral(amount);

        if (numAmount.value() <= 0) {
            Alert.alert(_('kuna-code.enter-amount-warning'));
            return;
        }

        // @TODO Translate
        const offerTitle = 'Do you want to create offer?';
        const offerMessage = `To ${side} KUNA Code for ${numAmount.format('0,0')} ${currency}`;

        Alert.alert(offerTitle, offerMessage, [
            { text: _('general.cancel'), style: 'cancel' },
            {
                text: _('general.create'),
                style: 'default',
                onPress: this.props.submitForm,
            },
        ]);
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
