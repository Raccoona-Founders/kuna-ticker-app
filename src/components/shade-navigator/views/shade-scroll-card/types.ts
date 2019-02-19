import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { NavigationTransitionProps } from 'react-navigation';

export type ShadeCardOuterProps = {
    style?: StyleProp<ViewStyle>;
    withBrow?: boolean;
    innerRef?: React.RefObject<ScrollView>;
    renderFooter?: () => JSX.Element;
};

export type ShadeCardProps
    = NavigationTransitionProps
    & ShadeCardOuterProps;
