import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Text, View, StyleSheet } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaPairMap } from 'kuna-sdk';
import { Link } from 'react-router-native';

export class Pair extends React.PureComponent<RouteComponentProps<{ key: string; }>> {

    public componentDidMount(): void {
        tracker.trackScreenView('home');
    }

    public render(): JSX.Element {

        const { key } = this.props.match.params;

        const getPair = kunaPairMap[key];

        return (
            <View style={styles.pairContainer}>
                <Link to={'/'}><View style={styles.backButton}><Text>Back</Text></View></Link>

                <Text style={styles.content}>{getPair.baseAsset} / {getPair.quoteAsset}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pairContainer: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    backButton: {
        marginBottom: 30,
        fontSize: 14
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
    }
});
