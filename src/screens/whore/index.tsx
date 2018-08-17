import React from 'react';
import { Text } from 'react-native';
import { tracker } from 'utils/ga-tracker';

export const Whore = () => {
    tracker.trackScreenView('whore');

    return (
        <Text>
            Page with whores.
        </Text>
    );
};
