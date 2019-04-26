import React from 'react';
import { View } from 'react-native';
import { SceneTransitionContext } from '../scene-transition-context';
import { ShadeCardOuterProps } from './types';
import ShadeScrollCard from './card.ios';

export default (props: ShadeCardOuterProps): JSX.Element => {
    const context = React.useContext(SceneTransitionContext);

    return context ? <ShadeScrollCard {...context} {...props} /> : <View />;
};
