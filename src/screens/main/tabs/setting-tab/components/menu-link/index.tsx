import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { SpanText } from 'components/span-text';
import { compose } from 'recompose';
import RouteKeys from 'router/route-keys';
import { Color } from 'styles/variables';
import Icon from 'components/icon';

type MenuLinkOuterProps = {
    title: string;
    route: RouteKeys;
    routeParams?: object;
};

type MenuLinkProps = MenuLinkOuterProps & NavigationInjectedProps;

const MenuLink = (props: MenuLinkProps) => {

    const onPress = () => {
        props.navigation.push(props.route, props.routeParams);
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <SpanText style={styles.title}>{props.title}</SpanText>

            <Icon name="slideRight" fill={Color.GrayBlues} height={15} width={9} />
        </TouchableOpacity>
    );
};

export default compose<MenuLinkProps, MenuLinkOuterProps>(withNavigation)(MenuLink);

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
    },
});
