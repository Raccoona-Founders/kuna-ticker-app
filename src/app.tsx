import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { LinkButton } from 'components/link-button';

import DeviceInfo from 'react-native-device-info';

import { Home } from 'screens/home';
import { Whore } from 'screens/whore';

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/whore" component={Whore} />
                        </Switch>

                        <Text>{DeviceInfo.getApplicationName()} - {DeviceInfo.getVersion()}</Text>
                    </View>

                    <View style={styles.navBar}>
                        <LinkButton to="/" exact>First</LinkButton>
                        <LinkButton to="/whore">Whore</LinkButton>
                    </View>
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    content: {
        padding: 10,
        marginTop: 25,
    },
    navBar: {
        padding: 10,
        paddingRight: 10,
        borderWidth: 0,
        borderRadius: 8,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
