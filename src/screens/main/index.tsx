import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-native';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaPairMap, KunaPair, getAsset } from 'kuna-sdk';
import { Color } from 'styles/variables';


type PairTickerProps = {
    item: KunaPair;
};

export class Main extends React.PureComponent {

    public componentDidMount(): void {
        tracker.trackScreenView('main');
    }

    public render(): JSX.Element {
        return (
            <ScrollView style={styles.flatList}>
                {map(kunaPairMap, item => this.renderTicker({ item }))}
            </ScrollView>
        );
    }

    protected renderTicker = (props: PairTickerProps): JSX.Element => {
        const { item } = props;

        const baseAsset = getAsset(item.baseAsset);

        return (
            <Link to={`/pair/${item.key}`} key={item.key}>
                <View style={styles.listItem}>
                    <View style={[styles.assetPoint, { backgroundColor: baseAsset.color }]} />
                    <View style={styles.pairBox}>
                        <Text style={[styles.pairBoxText, styles.pairBoxBase]}>{item.baseAsset}</Text>
                        <Text style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</Text>
                        <Text style={[styles.pairBoxText, styles.pairBoxQuote]}>{item.quoteAsset}</Text>
                    </View>
                </View>
            </Link>
        );
    };
}

const styles = StyleSheet.create({
    flatList: {
        marginTop: 30,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 57,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        shadowColor: '#585A5E',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6,
    },
    assetPoint: {
        height: 24,
        width: 24,
        borderRadius: 24,
        marginRight: 10,
    },
    pairBox: {
        flex: 1,
        flexDirection: 'row',
    },
    pairBoxText: {
        color: Color.Dark,
        fontSize: 16,
        fontWeight: '500',
    },
    pairBoxBase: {

    },
    pairBoxSeparator: {
        marginLeft: 2,
        marginRight: 2,
    },
    pairBoxQuote: {
        color: Color.TextSecondary,
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
    }
});
