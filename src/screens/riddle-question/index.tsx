import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import RouteKeys from 'router/route-keys';
import UIButton from 'components/ui-button';
import { RiddleQuestion, riddleList, Riddle } from 'components/riddle';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import Analitics from 'utils/ga-tracker';


type RiddleQuestionScreenProps = NavigationInjectedProps<{ index: number; }>;

export default class RiddleQuestionScreen extends React.PureComponent<RiddleQuestionScreenProps> {

    public componentDidMount() {
        const { navigation } = this.props;
        const index = navigation.getParam('index');

        Analitics.trackScreen(`riddle/question/${index}`);
    }

    public render(): JSX.Element {

        const { navigation } = this.props;
        const index = navigation.getParam('index');
        const riddle: Riddle = riddleList[index];

        if (!riddle) {
            return <View />;
        }

        return (
            <View style={styles.container}>
                <View>
                    <RiddleQuestion index={index} riddle={riddle} />
                    <UIButton onPress={this.__openAnswer}>Знаю ответ!</UIButton>
                </View>

                <View style={styles.codeContainer}>
                    <SpanText style={styles.codeTopic}>Проверь Kuna Codе, вдруг тебя уже кто-то опередил</SpanText>
                    <View style={styles.codePrefixContainer}>
                        <SpanText style={styles.codePrefix}>{riddle.prize_prefix}</SpanText>
                    </View>
                    <SpanText style={styles.codePostInformation}>
                        Если код уже активирован, то не расстраивайся. В будующем будет больше загадок и Kuna кодов.
                    </SpanText>
                </View>
            </View>
        );
    }

    protected __openAnswer = () => {
        const { navigation } = this.props;

        const index = navigation.getParam('index');

        navigation.push(RouteKeys.RiddleAnswer, {
            index: index,
        });
    };
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'space-between',
    },

    codeContainer: {
        marginTop: 20,
        marginBottom: 20,
    },

    codeTopic: {
        fontSize: 12,
        color: Color.Gray2,
    },
    codePrefixContainer: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Color.Gray,
        borderRadius: 5,
    },
    codePrefix: {
        fontSize: 18,
        textAlign: 'center',
        color: Color.Gray2,
    },
    codePostInformation: {
        fontSize: 12,
        color: Color.Gray2,
    },
});
