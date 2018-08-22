import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-native';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaMarketMap, KunaMarket, getAsset } from 'kuna-sdk';
import { Color } from 'styles/variables';
import { FillShadow } from 'styles/shadows';

import { MainHeader } from './main-header';
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
                <MainHeader />
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
            <Link to={`/market/${market.key}`} key={market.key}>
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
    container: {},
    flatList: {},
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 57,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginLeft: 10,
        marginRight: 10,
        ...FillShadow,
    },
    pairBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '500',
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 2,
        marginRight: 2,
        color: Color.TextSecondary,
        fontSize: 12,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 12,
        color: Color.TextSecondary,
        textAlignVertical: 'bottom',
    },
    inputStyle: {
        color: '#444',
        backgroundColor: '#eee',
        borderWidth: 0.5,
        borderColor: '#aaa',
        borderRadius: 3,
        padding: 6,
        fontSize: 14,
        width: 100,
    },
});
