import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ShadeScrollCard } from 'components/shade-navigator';
import SpanText from 'components/span-text';

export default () => {
    return (
        <ShadeScrollCard style={{ paddingTop: 100, alignItems: 'center' }}>
            <ActivityIndicator size="large" style={{ marginBottom: 20 }} />
            <SpanText style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                Processing you offer. Please wait...
            </SpanText>
        </ShadeScrollCard>
    );
};
