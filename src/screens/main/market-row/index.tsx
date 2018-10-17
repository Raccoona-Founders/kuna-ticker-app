import React from 'react';
import Numeral from 'numeral';
import { find } from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Text, View, TouchableOpacity } from 'react-native';
import { KunaMarket, KunaTicker } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';

import { MarketNameCell } from './market-name-cell';
import { styles } from './styles';

const MarketRowComponent = (props: MarketRowProps) => {
    const {market, ticker, navigation} = props;

    const onPress = () => {
        if (!ticker) {
            return;
        }

        navigation.navigate('Market', {symbol: market.key});
    };

    return (
        <TouchableOpacity key={market.key} onPress={onPress} style={styles.listItemLink}>
            <View style={styles.listItem}>
                <MarketNameCell market={market}/>

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <Text style={styles.priceValue}>
                            {ticker ? numFormat(ticker.last, market.format) : '—'}
                        </Text>
                        <Text style={styles.priceLabel}>{market.quoteAsset}</Text>
                    </View>

                    <View>
                        <Text style={styles.marketVolume}>
                            {ticker ? (
                                <>
                                    Volume: {Numeral(ticker.vol).multiply(ticker.last).format('0,0.[00]')}
                                </>
                            ) : '—'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

type MarketRowOuterProps = {
    market: KunaMarket;
};

type ConnectedProps = {
    ticker?: KunaTicker;
};

type MarketRowProps = NavigationInjectedProps & MarketRowOuterProps & ConnectedProps;

const mapStateToProps = (store: KunaStore, ownProps: MarketRowOuterProps): ConnectedProps => {
    return {
        ticker: find(store.ticker.tickers, {market: ownProps.market.key}),
    };
};

export const MarketRow = compose<MarketRowProps, MarketRowOuterProps>(
    connect(mapStateToProps),
    withNavigation,
)(MarketRowComponent);
