import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import { Main } from 'screens/main';
import { Market } from 'screens/market';
import { Color } from 'styles/variables';

const Stack = require('react-router-native-stack').default;

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <SafeAreaView style={styles.safeArea}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Stack>
                            <Route path="/" exact component={Main} animationType="fade-vertical" />
                            <Route path="/market/:symbol" component={Market} />
                        </Stack>
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
        backgroundColor: Color.Primary,
    },
});
