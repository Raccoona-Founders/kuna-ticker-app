import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import { Main } from 'screens/main';
import { Pair } from 'screens/pair';

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/pair/:key" component={Pair} />
                    </Switch>
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        bottom: 0,
    },
});
