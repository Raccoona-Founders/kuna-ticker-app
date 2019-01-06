import React from 'react';
import { View, StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-native';
import * as H from 'history';
import SpanText from 'components/span-text';

type RouterLinkProps = TouchableOpacityProps & RouteComponentProps & {
    to: H.Path;
    children: any;
    boxStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    activeStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};


const RouterLink = withRouter((props: RouterLinkProps) => {
    const isMatch = matchPath(props.to, {
        path: props.match.path,
        exact: true,
        strict: false,
    });

    const onPress = () => props.history.push(props.to);

    return (
        <TouchableOpacity onPress={onPress} style={props.boxStyle}>
            <View style={[props.style, isMatch ? props.activeStyle : {}]}>
                <SpanText style={props.textStyle}>{props.children}</SpanText>
            </View>
        </TouchableOpacity>
    );
});

export default RouterLink;

