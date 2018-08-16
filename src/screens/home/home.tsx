import React from 'react';
import { Text } from 'react-native';
import { tracker } from 'utils/ga-tracker';

export const Home = () => {
    tracker.trackScreenView('home');

    return (
        <Text>
            Home page!
        </Text>
    );
};
