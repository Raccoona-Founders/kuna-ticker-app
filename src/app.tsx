import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import { Main } from 'screens/main';
import { Pair } from 'screens/pair';
import { Color } from 'styles/variables';

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <SafeAreaView style={styles.safeArea}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/pair/:key" component={Pair} />
                        </Switch>
                    </View>
                </NativeRouter>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Color.Background,
        bottom: 0,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Color.Primary,
    },
});
