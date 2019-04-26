import React from 'react';
import { NavigationScene, NavigationTransitionProps } from 'react-navigation';

export type TSceneTransitionContext = NavigationTransitionProps & {
    scene: NavigationScene;
};

export const SceneTransitionContext = React.createContext<TSceneTransitionContext | undefined>(undefined);
export const SceneTransitionProvider = SceneTransitionContext.Provider;
export const SceneTransitionConsumer = SceneTransitionContext.Consumer;

export default { SceneTransitionProvider, SceneTransitionConsumer };