import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import RouteKeys from 'router/route-keys';
import UIButton from 'components/ui-button';
import { RiddleQuestion, riddleList, Riddle } from 'components/riddle';
import SpanText from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import { Color } from 'styles/variables';
import AnalTracker from 'utils/ga-tracker';


type RiddleQuestionScreenProps = NavigationInjectedProps<{ index: number; }>;

export default class RiddleQuestionScreen extends React.PureComponent<RiddleQuestionScreenProps> {
    private readonly __riddle: Riddle;

    public constructor(props: RiddleQuestionScreenProps) {
        super(props);

        const { navigation } = this.props;
        const index = navigation.getParam('index');

        this.__riddle = riddleList[index];
    }

    public render(): JSX.Element {
        const { navigation } = this.props;
        const index = navigation.getParam('index');

        return (
            <ShadeScrollCard style={styles.container} renderFooter={this.__renderFooter}>
                <RiddleQuestion index={index} riddle={this.__riddle} />
                <UIButton onPress={this.__openAnswer} title="Знаю ответ!" />
            </ShadeScrollCard>
        );
    }

    private __renderFooter = () => {
        return (
            <View style={styles.codeContainer}>
                <SpanText style={styles.codeTopic}>Проверь Kuna Codе, вдруг тебя уже кто-то опередил</SpanText>
                <View style={styles.codePrefixContainer}>
                    <SpanText style={styles.codePrefix}>{this.__riddle.prize_prefix}</SpanText>
                </View>
                <SpanText style={styles.codePostInformation}>
                    Если код уже активирован, то не расстраивайся. В будующем будет больше загадок и Kuna кодов.
                </SpanText>
            </View>
        );
    };

    private __openAnswer = () => {
        const { navigation } = this.props;

        const index = navigation.getParam('index');

        navigation.push(RouteKeys.Riddle_Answer, {
            index: index,
        });
    };
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    codeContainer: {
        padding: 20,
    },

    codeTopic: {
        fontSize: 12,
        color: Color.GrayBlues,
    },
    codePrefixContainer: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Color.GrayWhite,
        borderRadius: 5,
    },
    codePrefix: {
        fontSize: 18,
        textAlign: 'center',
        color: Color.GrayBlues,
    },
    codePostInformation: {
        fontSize: 12,
        color: Color.GrayBlues,
    },
});
