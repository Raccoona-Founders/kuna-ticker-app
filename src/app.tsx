import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import { Home } from 'screens/home';

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5fcff',
        bottom: 0,
    },
});
