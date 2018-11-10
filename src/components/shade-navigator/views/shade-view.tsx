import React from 'react';
import {
    NavigationDescriptor,
    NavigationInjectedProps,
    NavigationStackViewConfig,
    Transitioner,
    NavigationTransitionProps,
    NavigationTransitionSpec,
} from 'react-navigation';

import { ShadeViewLayout } from 'components/shade-navigator/views/shade-view-layout';


export type ShadeViewProps = {
    descriptors: { [key: string]: NavigationDescriptor };

    navigationConfig?: NavigationStackViewConfig;
    screenProps?: { [key: string]: any };
    onGestureBegin?: () => void;
    onGestureCanceled?: () => void;
    onGestureEnd?: () => void;
} & NavigationInjectedProps;


export class ShadeView extends React.PureComponent<ShadeViewProps> {
    public render(): JSX.Element {
        const transitionerProps = {
            navigation: this.props.navigation,
            descriptors: this.props.descriptors,
            configureTransition: this._configureTransition,
            render: this._renderLayout,

            onTransitionStart: () => {
                // this.props.onTransitionStart || this.props.navigationConfig.onTransitionStart
            },

            onTransitionEnd: (transition: any, lastTransition: any): any => {
                // this.props.onTransitionStart || this.props.navigationConfig.onTransitionStart
            }
        };

        return <Transitioner {...transitionerProps} />;
    }


    protected _configureTransition = (): NavigationTransitionSpec => {
        return {
            duration: 300,
        };
    };


    protected _renderLayout = (
        transitionProps: NavigationTransitionProps,
        lastTransitionProps?: NavigationTransitionProps,
    ): JSX.Element => {

        const { screenProps, navigationConfig } = this.props;

        return (
            <ShadeViewLayout
                {...navigationConfig}
                screenProps={screenProps}
                descriptors={this.props.descriptors}
                transitionProps={transitionProps}
                lastTransitionProps={lastTransitionProps}
            />
        );
    };
}