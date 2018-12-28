import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-native';
import * as H from 'history';
import SpanText from 'components/span-text';

type RouterLinkProps = TouchableOpacityProps & RouteComponentProps & {
    to: H.Path;
    children: any;
    style?: StyleProp<ViewStyle>;
    activeStyle?: StyleProp<ViewStyle>;
};

const RouterLink = withRouter((props: RouterLinkProps) => {
    const isMatch = matchPath(props.to, {
        path: props.match.path,
        exact: true,
        strict: false,
    });

    const onPress = () => props.history.push(props.to);

    return (
        <TouchableOpacity onPress={onPress}>
            <SpanText style={[props.style, isMatch ? props.activeStyle : {}]}>{props.children}</SpanText>
        </TouchableOpacity>
    );
});

export default RouterLink;

