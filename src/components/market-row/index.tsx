import React from 'react';
import { find } from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Text, View, TouchableOpacity } from 'react-native';
import { KunaMarket, KunaTicker } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import { SpanText } from 'components/span-text';

import { MarketNameCell } from './market-name-cell';
import { styles } from './styles';
import { UsdCalculator } from 'utils/currency-rate';

const MarketRow = (props: MarketRowProps) => {
    const { market, ticker, tickers, usdRate, navigation } = props;

    const onPress = () => {
        if (!ticker) {
            return;
        }

        navigation.navigate('Market', { symbol: market.key });
    };

    const usdPrice = new UsdCalculator(usdRate, tickers).getPrice(market.key);

    return (
        <TouchableOpacity key={market.key} onPress={onPress} style={styles.listItemLink}>
            <View style={styles.listItem}>
                <MarketNameCell market={market} />

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <SpanText style={styles.priceValue}>
                            {ticker ? numFormat(ticker.last, market.format) : '—'}
                        </SpanText>
                        <SpanText style={styles.priceLabel}>{market.quoteAsset}</SpanText>
                    </View>

                    <View>
                        <SpanText style={styles.marketVolume}>
                            ≈ ${usdPrice.format('0,0.[00]')}
                        </SpanText>
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
    tickers: Record<string, KunaTicker>;
    usdRate: number;
};

type MarketRowProps = NavigationInjectedProps & MarketRowOuterProps & ConnectedProps;

const mapStateToProps = (store: KunaStore, ownProps: MarketRowOuterProps): ConnectedProps => {
    return {
        ticker: find(store.ticker.tickers, { market: ownProps.market.key }),
        tickers: store.ticker.tickers,
        usdRate: store.ticker.usdRate,
    };
};

export default compose<MarketRowProps, MarketRowOuterProps>(
    connect(mapStateToProps),
    withNavigation,
)(MarketRow);
