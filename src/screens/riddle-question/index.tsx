import React from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { RiddleQuestion } from 'components/riddle';

type RiddleQuestionScreenProps = NavigationInjectedProps<{ index: number; }>;

export class RiddleQuestionScreen extends React.PureComponent<RiddleQuestionScreenProps> {
    public render(): JSX.Element {

        const { navigation } = this.props;
        const index = navigation.getParam('index');

        return (
            <>
                <RiddleQuestion index={index} />
            </>
        );
    }
}
