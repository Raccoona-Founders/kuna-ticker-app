import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { compose } from 'recompose';
import Icon from 'components/icon';
import { SpanText } from 'components/span-text';
import RouteKeys from 'router/route-keys';
import { Color } from 'styles/variables';


type MenuLinkOuterProps = {
    title: string;
    onPress?: () => void;
    route?: RouteKeys;
    routeParams?: object;
    isLoading?: boolean;
};

type MenuLinkProps
    = MenuLinkOuterProps
    & NavigationInjectedProps;

function MenuLink(props: MenuLinkProps): JSX.Element {
    const onPress = () => {
        if (props.route) {
            props.navigation.push(props.route, props.routeParams);
        } else {
            props.onPress && props.onPress();
        }
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <SpanText style={styles.title}>{props.title}</SpanText>
                {props.isLoading ? (
                    <ActivityIndicator size="small" style={{ marginLeft: 10 }} />
                ) : undefined}
            </View>

            <Icon name="slideRight" fill={Color.SecondaryText} />
        </TouchableOpacity>
    );
}

export default compose<MenuLinkProps, MenuLinkOuterProps>(withNavigation)(MenuLink);

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
    },
});
