import React from 'react';
import { kunaMarketMap } from 'kuna-sdk';
import { RouteComponentProps } from 'react-router-native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { tracker } from 'utils/ga-tracker';
import { Color } from 'styles/variables';
import { Topic } from 'components/topic';

export class Market extends React.PureComponent<RouteComponentProps<{ symbol: string; }>> {

    public componentDidMount(): void {
        tracker.trackScreenView('home');
    }

    public render(): JSX.Element {
        const { symbol } = this.props.match.params;
        const currentMarket = kunaMarketMap[symbol];

        return (
            <View style={{ flex: 1 }}>
                <Topic title={`${currentMarket.baseAsset} / ${currentMarket.quoteAsset}`}
                       leftContent={(
                           <Link to={'/'} component={TouchableOpacity}>
                               <Text style={styles.backButton}>Back</Text>
                           </Link>
                       )}
                />

                <View style={styles.pairContainer}>
                    <Text style={styles.content}>{currentMarket.baseAsset} / {currentMarket.quoteAsset}</Text>
                </View>
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
        color: Color.Primary,
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
    },
});
