import React from 'react';
import { NavigationScene, NavigationTransitionProps } from 'react-navigation';

export type SceneTransitionContext = NavigationTransitionProps & {
    scene: NavigationScene;
};

const SceneTransitionContext = React.createContext<SceneTransitionContext | undefined>(undefined);

export const SceneTransitionProvider = SceneTransitionContext.Provider;
export const SceneTransitionConsumer = SceneTransitionContext.Consumer;

export default { SceneTransitionProvider, SceneTransitionConsumer };