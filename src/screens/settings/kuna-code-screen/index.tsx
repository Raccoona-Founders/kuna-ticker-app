import React from 'react';
import ShadeScrollCard from 'components/shade-navigator/views/shade-scroll-card';
import Topic from 'components/topic';
import { _ } from 'utils/i18n';
import { inject, observer } from 'mobx-react/native';

type SettingsProps = mobx.user.WithUserProps;

@inject('User')
@observer
export default class KunaCodeScreen extends React.Component<SettingsProps> {
    public render(): JSX.Element {
        return (
            <ShadeScrollCard>
                <Topic title={_('setting.kuna-code.title')} />
            </ShadeScrollCard>
        );
    }
}