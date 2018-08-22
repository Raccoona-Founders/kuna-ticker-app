import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Text, View, StyleSheet } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaMarketMap } from 'kuna-sdk';
import { Link } from 'react-router-native';

export class Market extends React.PureComponent<RouteComponentProps<{ symbol: string; }>> {

    public componentDidMount(): void {
        tracker.trackScreenView('home');
    }

    public render(): JSX.Element {
        const { symbol } = this.props.match.params;
        const currentMarket = kunaMarketMap[symbol];

        return (
            <View style={styles.pairContainer}>
                <Link to={'/'}><View style={styles.backButton}><Text>Back</Text></View></Link>

                <Text style={styles.content}>{currentMarket.baseAsset} / {currentMarket.quoteAsset}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pairContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    backButton: {
        marginBottom: 30,
        fontSize: 14,
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
    },
});
