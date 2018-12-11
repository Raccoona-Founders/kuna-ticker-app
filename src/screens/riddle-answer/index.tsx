import React from 'react';
import { StyleSheet, TextInput, View, Vibration, Clipboard, TouchableOpacity, Share } from 'react-native';
import { riddleList, Riddle, riddleChecker } from 'components/riddle';
import { NavigationInjectedProps } from 'react-navigation';
import Analitics from 'utils/ga-tracker';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';
import { ShadeScrollCard } from 'components/shade-navigator';

import { Color, Fonts } from 'styles/variables';


const errorMessages: Record<string, string> = {
    no_answer: 'Ну хоть что-то введи!',
    to_many_request: 'Эй, помедленее! Слишком часто отвечаешь.',
    invalid_answer: 'Ответ не верный!',
};

type RiddleQuestionScreenProps = NavigationInjectedProps<{ index: number; }>;
type State = {
    riddle?: Riddle;
    value: string;
    errorMessage?: string;
    prize?: string;
};

export default class RiddleAnswerScreen extends React.PureComponent<RiddleQuestionScreenProps, State> {
    public state: State = {
        riddle: undefined,
        value: '',
        errorMessage: undefined,
        prize: undefined,
    };

    protected _textInputRef = React.createRef<TextInput>();

    public componentDidMount() {
        const { navigation } = this.props;
        const index = navigation.getParam('index');
        const riddle = riddleList[index];

        Analitics.trackScreen(`riddle/answer/${index}`);

        if (!riddle) {
            this.props.navigation.goBack();

            return;
        }

        this.setState({ riddle: riddle });

        setTimeout(() => {
            if (this._textInputRef.current) {
                this._textInputRef.current.focus();
            }
        }, 300);
    }


    public render(): JSX.Element {
        const { riddle, prize } = this.state;

        if (!riddle) {
            return <ShadeScrollCard />;
        }

        return (
            <ShadeScrollCard style={styles.container}>
                <SpanText style={styles.question}>{riddle.question}</SpanText>

                {prize ? this.__renderPrize() : this.__renderAnswerInput()}
            </ShadeScrollCard>
        );
    }

    protected __renderPrize = () => {
        const { prize } = this.state;

        return (
            <View style={styles.successContainer}>
                <SpanText style={styles.successTitle}>Это правильный ответ!</SpanText>

                <View style={styles.successPrizeContainer}>
                    <SpanText style={styles.successPrize}>{prize}</SpanText>
                    <View style={styles.prizeInteraction}>
                        <TouchableOpacity onPress={this.__copy}>
                            <SpanText style={styles.prizeInteractionButton}>Copy</SpanText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.__share}>
                            <SpanText style={styles.prizeInteractionButton}>Share</SpanText>
                        </TouchableOpacity>
                    </View>
                </View>

                <SpanText style={styles.successPostMessage}>
                    Введи его как можно скорее, а иначе тебя могут опередить!
                </SpanText>
            </View>
        );
    };

    protected __renderAnswerInput = () => {
        const { value, errorMessage } = this.state;

        return (
            <>
                <TextInput
                    ref={this._textInputRef}
                    value={value}
                    onChangeText={(text: string) => this.setState({ value: text })}
                    placeholder="Введи ответ"
                    keyboardType="numeric"
                    style={styles.input}
                />

                <UIButton onPress={this.__onCheckAnswer} style={{ marginTop: 20 }}>Проверить</UIButton>

                {errorMessage ? <SpanText style={styles.error}>{errorMessage}</SpanText> : undefined}
            </>
        );
    };


    private __copy = () => {
        Clipboard.setString(this.state.prize || '');
    };


    private __share = () => {
        Share.share({
            message: this.state.prize || '',
        });
    };


    protected __onCheckAnswer = async () => {
        const { value, riddle } = this.state;
        const { navigation } = this.props;
        const index = navigation.getParam('index');

        if (!riddle) {
            return;
        }

        try {
            const prize = await riddleChecker.getPrize(riddle, value);

            this.setState({
                prize: prize,
                errorMessage: undefined,
            });

            Analitics.logEvent('success_riddle_answer', {
                riddle_index: index,
            });

        } catch (error) {
            this.__showError(error);
        }
    };

    protected __showError = (error: Error) => {
        const message = errorMessages[error.message] || undefined;

        this.setState({ errorMessage: message || 'Что-то пошло не так!' });
        Vibration.vibrate(300, false);
    };
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 20,
    },

    input: {
        paddingLeft: 15,
        backgroundColor: Color.Gray,
        borderRadius: 3,
        height: 48,
        fontSize: 16,
        width: '100%',
        paddingRight: 55,
        borderWidth: 1,
        borderColor: Color.Gray3,
        fontFamily: Fonts.TTNorms_Regular,
        fontWeight: '500',
    },

    error: {
        color: Color.Danger,
    },

    successContainer: {},
    successTitle: {
        color: Color.Gray2,
    },
    successPrizeContainer: {
        backgroundColor: Color.Gray,
        padding: 20,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    successPrize: {
        fontSize: 20,
    },
    successPostMessage: {
        color: Color.Gray2,
        fontSize: 12,
    },

    prizeInteraction: {
        marginTop: 20,
        flexDirection: 'row',
    },
    prizeInteractionButton: {
        fontSize: 16,
        color: Color.Purple,
        padding: 0,
        marginRight: 30,
    },
});
