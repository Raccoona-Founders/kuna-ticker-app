import React from 'react';
import { SceneTransitionConsumer, SceneTransitionContext, } from '../scene-transition-context';
import { ShadeCardOuterProps } from './types';
import ShadeScrollCard from './card.ios';

export default (props: ShadeCardOuterProps) => {
    return (
        <SceneTransitionConsumer>
            {(context: SceneTransitionContext | undefined) => (
                context && <ShadeScrollCard {...context} {...props} />
            )}
        </SceneTransitionConsumer>
    );
}
