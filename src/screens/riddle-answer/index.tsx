import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { RiddleQuestion, riddleList, Riddle } from 'components/riddle';
import { NavigationInjectedProps } from 'react-navigation';
import SpanText from 'components/span-text';
import { Color, Fonts } from 'styles/variables';

type RiddleQuestionScreenProps = NavigationInjectedProps<{ index: number; }>;
type State = {
    riddle?: Riddle;
    value: string;
};

export default class RiddleAnswerScreen extends React.PureComponent<RiddleQuestionScreenProps, State> {
    public state: State = {
        riddle: undefined,
        value: '',
    };

    protected _textInputRef = React.createRef<TextInput>();
    
    public componentDidMount() {
        const { navigation } = this.props;
        const index = navigation.getParam('index');
        const riddle = riddleList[index];

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
        const { riddle, value } = this.state;

        if (!riddle) {
            return <View />;
        }

        return (
            <View style={styles.container}>
                <SpanText style={styles.question}>{riddle.question}</SpanText>

                <TextInput
                    ref={this._textInputRef}
                    value={value}
                    onChangeText={(text: string) => this.setState({ value: text })}
                    placeholder="Введи ответ"
                    keyboardType="numeric"
                    style={styles.input}
                />
            </View>
        );
    }
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
});
