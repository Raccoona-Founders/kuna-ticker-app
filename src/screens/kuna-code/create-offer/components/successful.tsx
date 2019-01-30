import React from 'react';
import SpanText from 'components/span-text';
import ShadeScrollCard from 'components/shade-navigator/views/shade-scroll-card';
import { DefaultStyles } from 'styles/variables';

export default () => {
    // @TODO translate
    return (
        <ShadeScrollCard style={{ paddingTop: 100, alignItems: 'center' }}>
            <SpanText style={{ textAlign: 'center', ...DefaultStyles.boldFont, fontSize: 18 }}>
                Congratulation!
            </SpanText>
            <SpanText style={{ textAlign: 'center', marginTop: 10, fontSize: 18 }}>
                You Offer Successful created
            </SpanText>
        </ShadeScrollCard>
    );
};
