import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import { _ } from 'utils/i18n';
import RouteKeys from 'router/route-keys';
import DescriptionItem from 'components/description-item';
import SpanText from 'components/span-text';
import UIButton from 'components/ui-button';
import { Color, DefaultStyles } from 'styles/variables';

class UserInfo extends React.Component<any & mobx.user.WithUserProps & NavigationInjectedProps> {
    public render(): JSX.Element {
        const { User } = this.props;

        const errorMessage = this.__errorMessage();

        if (errorMessage) {
            return (
                <View>
                    <SpanText style={{ ...DefaultStyles.boldFont, color: Color.Danger, marginBottom: 20 }}>
                        {errorMessage}
                    </SpanText>
                    <UIButton onPress={this.__openSettings} small title={_('kuna-code.open-settings')} />
                </View>
            );
        }

        return (
            <View>
                {User.displayName ? (
                    <DescriptionItem topic={_('general.display-name')}>
                        {User.displayName}
                    </DescriptionItem>
                ) : undefined}

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
            return _('kuna-code.errors.name-and-telegram');
        }

        if (!User.displayName) {
            return _('kuna-code.errors.name');
        }

        if (!User.telegram) {
            return _('kuna-code.errors.telegram');
        }

        return undefined;
    };
}


export default compose<any, any>(
    withNavigation,
    inject('User'),
    observer,
)(UserInfo);