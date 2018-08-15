import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { LinkButton } from 'components/link-button';

export class Application extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <View style={styles.navBar}>
                        <LinkButton to="/" exact>First</LinkButton>
                        <LinkButton to="/whore">Second</LinkButton>
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
