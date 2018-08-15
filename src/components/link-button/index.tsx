import React from 'react';
import { compose } from 'recompose';
import { TouchableHighlight, Text, RegisteredStyle } from 'react-native';
import { RouteComponentProps, withRouter, LinkProps, Link, matchPath } from 'react-router-native';

import styles from './link-button-styles';

const LinkButtonComponent = (props: LinkButtonProps) => {
    const { to, location, exact, children } = props;

    const isActive = matchPath(location.pathname, {
        path: (typeof to === 'string' ? to : to.pathname) || '/',
        exact: exact,
    });

    const style: RegisteredStyle<any>[] = [styles.link];
    if (isActive) {
        style.push(styles.activeLink);
    }

    return (
        <Link to={to} component={TouchableHighlight} underlayColor={null}>
            <Text style={style}>{children}</Text>
        </Link>
    );
};

export type LinkButtonOuterProps = LinkProps & {
    exact?: boolean;
};

export type LinkButtonProps = RouteComponentProps<any> & LinkButtonOuterProps;

export const LinkButton = compose<LinkButtonProps, LinkButtonOuterProps>(withRouter)(LinkButtonComponent);
