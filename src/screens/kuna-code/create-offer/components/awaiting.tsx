import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { _ } from 'utils/i18n';
import { ShadeScrollCard } from 'components/shade-navigator';
import SpanText from 'components/span-text';
import { DefaultStyles } from 'styles/variables';

export default () => {
    return (
        <ShadeScrollCard style={{ paddingTop: 100, alignItems: 'center' }}>
            <ActivityIndicator size="large" style={{ marginBottom: 20 }} />
            <SpanText style={styles.title}>
                {_('kuna-code.processing-offer')}
            </SpanText>
        </ShadeScrollCard>
    );
};

const styles = StyleSheet.create({
    title: {
        ...DefaultStyles.boldFont,
        textAlign: 'center',
        fontSize: 18,
    },
});
