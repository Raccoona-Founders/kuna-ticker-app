import React from 'react';
import { map } from 'lodash';
import { Text, ScrollView, View, StyleSheet, TextInput } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaAssets, kunaPairMap, KunaPair, getAsset } from 'kuna-sdk';
import { Color } from 'styles/variables';

type PairTickerProps = {
    item: KunaPair;
};

export class Home extends React.PureComponent {

    public componentDidMount(): void {
        tracker.trackScreenView('home');
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
            <View style={styles.listItem} key={item.key}>
                <View style={[styles.assetPoint, { backgroundColor: baseAsset.color }]} />
                <View style={styles.pairBox}>
                    <Text style={[styles.pairBoxText, styles.pairBoxBase]}>{item.baseAsset}</Text>
                    <Text style={[styles.pairBoxText, styles.pairBoxSeparator]}>/</Text>
                    <Text style={[styles.pairBoxText, styles.pairBoxQuote]}>{item.quoteAsset}</Text>
                </View>

                <View>
                    <TextInput keyboardType="numeric" style={styles.inputStyle} placeholder="0.00" />
                </View>
            </View>
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
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#B3B6BA',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 20,
        elevation: 1,
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
        fontSize: 16,
    },
    pairBoxBase: {
        fontWeight: '500',
    },
    pairBoxSeparator: {
        marginLeft: 4,
        marginRight: 4,
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
