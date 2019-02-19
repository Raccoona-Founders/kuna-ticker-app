import React from 'react';
import { SceneTransitionConsumer, SceneTransitionContext, } from '../scene-transition-context';
import { ShadeCardOuterProps } from './types';
// @ts-ignore
import ShadeScrollCard from './card';

export default (props: ShadeCardOuterProps) => {
    return (
        <SceneTransitionConsumer>
            {(context: SceneTransitionContext | undefined) => (
                context && <ShadeScrollCard {...context} {...props} />
            )}
        </SceneTransitionConsumer>
    );
}
