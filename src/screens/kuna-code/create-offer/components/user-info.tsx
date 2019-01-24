import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import RouteKeys from 'router/route-keys';
import DescriptionItem from 'components/description-item';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';
import { Color } from 'styles/variables';

// @ts-ignore
@compose(withNavigation, inject('User'), observer)
export default class UserInfo extends React.Component<any & mobx.user.WithUserProps & NavigationInjectedProps> {
    public render(): JSX.Element {
        const { User } = this.props;

        const errorMessage = this.__errorMessage();

        if (errorMessage) {
            return (
                <View>
                    {/* @TODO translate */}
                    <SpanText style={{ fontWeight: 'bold', color: Color.Danger, marginBottom: 20 }}>
                        {errorMessage}
                    </SpanText>
                    {/* @TODO translate */}
                    <UIButton onPress={this.__openSettings} small title="Open settings" />
                </View>
            );
        }

        return (
            <View>
                {/* @TODO translate */}
                {User.displayName ? (
                    <DescriptionItem topic="Display Name">
                        {User.displayName}
                    </DescriptionItem>
                ) : undefined}

                {/* @TODO translate */}
                {User.telegram ? (
                    <DescriptionItem topic="Telegram">
                        {`@${User.telegram}`}
                    </DescriptionItem>
                ) : undefined}
            </View>
        );
    }

    protected __openSettings = () => {
        this.props.navigation.push(RouteKeys.Setting_KunaCode);
    };

    protected __errorMessage = (): string | undefined => {
        const { User } = this.props as mobx.user.WithUserProps;

        if (!User.displayName && !User.telegram) {
            // @TODO translate
            return 'Please, setup your Display name and Telegram';
        }

        if (!User.displayName) {
            // @TODO translate
            return 'Please, setup your Display name';
        }

        if (!User.telegram) {
            // @TODO translate
            return 'Please, setup your Telegram';
        }

        return undefined;
    };
}
