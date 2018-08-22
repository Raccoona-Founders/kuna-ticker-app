import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';

import { Main } from 'screens/main';
import { Market } from 'screens/market';
import { Color } from 'styles/variables';

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <SafeAreaView style={styles.safeArea}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Switch>
                            <Route path="/" exact component={Main} animationType="fade-vertical" />
                            <Route path="/market/:symbol" component={Market} />
                        </Switch>
                    </View>
                </NativeRouter>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.Background,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Color.Background,
    },
});
