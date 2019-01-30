import React from 'react';
import { _ } from 'utils/i18n';
import SpanText from 'components/span-text';
import ShadeScrollCard from 'components/shade-navigator/views/shade-scroll-card';
import { DefaultStyles } from 'styles/variables';

export default () => {
    return (
        <ShadeScrollCard style={{ paddingTop: 100, alignItems: 'center' }}>
            <SpanText style={{ textAlign: 'center', ...DefaultStyles.boldFont, fontSize: 18 }}>
                {_('kuna-code.successful.title')}
            </SpanText>
            <SpanText style={{ textAlign: 'center', marginTop: 10, fontSize: 18 }}>
                {_('kuna-code.successful.description')}
            </SpanText>
        </ShadeScrollCard>
    );
};
