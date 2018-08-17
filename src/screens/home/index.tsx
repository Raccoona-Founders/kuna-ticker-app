import React from 'react';
import { map } from 'lodash';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { tracker } from 'utils/ga-tracker';

import { kunaAssets, kunaPairMap, KunaPair } from 'kuna-sdk';

type PairTickerProps = {
    item: KunaPair;
};

export class Home extends React.PureComponent {

    public componentDidMount(): void {
        tracker.trackScreenView('home');
    }

    public render(): JSX.Element {
        return (
            <FlatList
                style={styles.container}
                data={map(kunaPairMap, item => item)}
                renderItem={this.renderTicker}
            />
        );
    }

    protected renderTicker = (props: PairTickerProps): JSX.Element => {
        const { item } = props;

        return (
            <View style={styles.listItem}>
                <Text>{item.baseCurrency} / {item.quoteCurrency}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingBottom: 25,
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
});
