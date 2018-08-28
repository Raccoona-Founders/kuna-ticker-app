import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NativeRouter, Redirect, Route, Switch } from 'react-router-native';

import { MainScreen } from 'screens/main';
import { MarketScreen } from 'screens/market';
import { Color } from 'styles/variables';
import { KunaAssetUnit } from "kuna-sdk";

export class ApplicationRouter extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <SafeAreaView style={styles.safeArea}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Switch>
                            <Route path="/"
                                   render={() => <Redirect to={`/main/${KunaAssetUnit.UkrainianHryvnia}`}/>}
                                   exact
                            />

                            <Route path="/main/:symbol" component={MainScreen}/>
                            <Route path="/market/:symbol" component={MarketScreen}/>
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
