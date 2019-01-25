import React from 'react';
import { TextInput, View, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Topic from 'components/topic';
import { Color, Fonts } from 'styles/variables';
import { ShadeScrollCard } from 'components/shade-navigator';
import UIButton from 'components/ui-button';


type ScreenState = {
    text: string;
};

type Props = NavigationScreenProps;

export default class EnterTextScreen extends React.PureComponent<Props, ScreenState> {
    public state: ScreenState = {
        text: '',
    };

    protected title: string;
    protected description: string;
    protected placeholder: string;

    public constructor(props: Props) {
        super(props);

        const { navigation } = this.props;

        const text = navigation.getParam('text');

        this.state.text = text || '';

        this.title = navigation.getParam('title')
            || 'Enter text';

        this.description = navigation.getParam('description')
            || 'Explain what you love, or what to improve';

        this.placeholder = navigation.getParam('placeholder')
            || 'Enter your text';
    }

    public render(): JSX.Element {
        return (
            <ShadeScrollCard>
                <Topic title={this.title} description={this.description} />

                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={40}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={this.placeholder}
                            style={styles.input}
                            value={this.state.text}
                            multiline={true}
                            onChangeText={(text: string) => this.setState({ text: text })}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <UIButton title="Save" onPress={this._save} />
                    </View>
                </KeyboardAvoidingView>
            </ShadeScrollCard>
        );
    }

    protected _save = () => {
        Keyboard.dismiss();

        const onSave = this.props.navigation.getParam('onSave');
        onSave && onSave(this.state.text);

        const { navigation } = this.props;
        navigation.goBack();
    };
}


const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
        flex: 1,
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16,
        fontFamily: Fonts.TTNorms_Medium,
        color: Color.Text,
        height: '100%',
        maxHeight: '100%',
    },
    buttonContainer: {
        padding: 20,
    },
});
