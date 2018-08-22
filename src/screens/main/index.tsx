import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-native';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaMarketMap, KunaMarket, getAsset } from 'kuna-sdk';
import { Color } from 'styles/variables';
import { FillShadow } from 'styles/shadows';

import { Topic } from 'components/topic';
import { CoinIcon } from 'components/coin-icon';

type MarketTickerProps = {
    market: KunaMarket;
};

export class Main extends React.PureComponent {

    public componentDidMount(): void {
        tracker.trackScreenView('main');
    }

    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Topic title="Kuna Markets" />
                <ScrollView style={styles.flatList}>
                    {map(kunaMarketMap, market => this.renderTicker({ market: market }))}
                </ScrollView>
            </View>
        );
    }

    protected renderTicker = (props: MarketTickerProps): JSX.Element => {
        const { market } = props;

        const baseAsset = getAsset(market.baseAsset);

        return (
            <Link to={`/market/${market.key}`}
                  key={market.key}
                  style={styles.listItemLink}
                  component={TouchableOpacity}
            >
                <View style={styles.listItem}>
                    <CoinIcon size={24} asset={baseAsset} style={{ marginRight: 10 }} />
                    <View style={styles.pairBox}>
                        <Text style={[styles.pairBoxText, styles.pairBoxBase]}>{market.baseAsset}</Text>
                        <Text style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</Text>
                        <Text style={[styles.pairBoxText, styles.pairBoxQuote]}>{market.quoteAsset}</Text>
                    </View>
                </View>
            </Link>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 57,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        ...FillShadow,
    },
    listItemLink: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    pairBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '300',
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 4,
        marginRight: 4,
        color: Color.TextDarkSecondary,
        fontSize: 12,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 12,
        color: Color.TextDarkSecondary,
        textAlignVertical: 'bottom',
    },
});
