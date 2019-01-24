import React from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import { _ } from 'utils/i18n';
import ShadeScrollCard from 'components/shade-navigator/views/shade-scroll-card';
import Topic from 'components/topic';
import UIInput from 'components/ui-input';
import UIButton from 'components/ui-button';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';


type SettingsProps = mobx.user.WithUserProps & NavigationInjectedProps;
type SettingsState = {
    displayName: string;
    telegram: string;
    updateCounter: number;
};

@inject('User')
@observer
export default class KunaCodeScreen extends React.Component<SettingsProps, SettingsState> {
    public state: SettingsState = {
        displayName: '',
        telegram: '',
        updateCounter: 0,
    };

    public constructor(props: SettingsProps) {
        super(props);

        const { User } = this.props;
        this.state.displayName = User.displayName || '';
        this.state.telegram = User.telegram || '';
    }


    public render(): JSX.Element {

        let canSave = true;
        try {
            this.__validateData();
        } catch (error) {
            canSave = false;
        }

        return (
            <ShadeScrollCard>
                <Topic title={_('setting.kuna-code.title')} />

                <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                    <UIInput label="Display Name"
                             placeholder="John Dou"
                             value={this.state.displayName}
                             onChangeText={this.__onChangeDisplayName}
                    />

                    <UIInput label="Telegram"
                             placeholder="John_Dou_San"
                             description="You can use a-z, 0-9 and underscores. Minimum length is 5 characters."
                             value={this.state.telegram}
                             onChangeText={this.__onChangeTelegram}
                    />

                    <UIButton title="Save" onPress={this.__onClickSave} disabled={!canSave} />
                </View>
            </ShadeScrollCard>
        );
    }

    private __onChangeDisplayName = (text: string) => {
        this.setState({
            displayName: text,
            updateCounter: this.state.updateCounter + 1,
        });
    };

    private __onChangeTelegram = (text: string) => {
        this.setState({
            telegram: text,
            updateCounter: this.state.updateCounter + 1,
        });
    };


    private __validateData = () => {
        if (!this.state.displayName) {
            throw new Error('Invalid name');
        }

        if (this.state.telegram.length < 5) {
            throw new Error('Telegram must be more then 5 characters');
        }

        const telegram = this.state.telegram.match(/[^a-zA-Z1-9\_]/gm);

        if (telegram) {
            throw new Error('Invalid telegram');
        }
    };

    private __onClickSave = () => {
        const { User } = this.props;

        try {
            this.__validateData();
        } catch (error) {
            return;
        }

        User.setDisplayName(this.state.displayName);
        User.setTelegram(this.state.telegram);

        this.props.navigation.goBack();
    };
}
