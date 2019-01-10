import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { View, TouchableOpacity } from 'react-native';
import { KunaMarket } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import { SpanText } from 'components/span-text';

import { MarketNameCell } from './market-name-cell';
import styles from './market-row.styles';
import { inject, observer } from 'mobx-react/native';


const MarketRow = (props: MarketRowProps) => {
    const { market, Ticker, navigation, visible = true } = props;
    const currentTicker = Ticker.getTicker(market.key);

    if (!currentTicker || !currentTicker.lastPrice) {
        return <View />;
    }

    const onPress = () => {
        if (!currentTicker) {
            return;
        }

        navigation.navigate('Market', { symbol: market.key });
    };

    const usdPrice = Ticker.usdCalculator.getPrice(market.key);
    const dailyChangeStyles = [
        styles.dailyChange,
        currentTicker.dailyChangePercent > 0 ? styles.dailyChangeUp : styles.dailyChangeDown,
    ];

    const containerStyle = [
        styles.listItemLink,
        visible ? undefined : styles.listItemLinkInvisible,
    ];

    return (
        <TouchableOpacity key={market.key} onPress={onPress} style={containerStyle}>
            <View style={styles.listItem}>
                <MarketNameCell market={market} />

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <SpanText style={styles.priceValue}>
                            {currentTicker.lastPrice ? numFormat(currentTicker.lastPrice || 0, market.format) : '—'}
                            {' '}
                            {market.quoteAsset}
                        </SpanText>
                    </View>

                    <View style={styles.secondaryInfo}>
                        <SpanText style={styles.marketVolume}>
                            ~ ${usdPrice.format('0,0.00')}
                        </SpanText>
                        <SpanText style={styles.separator}> / </SpanText>
                        <SpanText style={dailyChangeStyles}>
                            {numeral(currentTicker.dailyChangePercent).format('+0,0.00')}%
                        </SpanText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

type MarketRowOuterProps = {
    market: KunaMarket;
    visible?: boolean;
};

type MarketRowProps
    = NavigationInjectedProps
    & MarketRowOuterProps
    & MobxUsdRate.WithUsdRateProps
    & MobxTicker.WithTickerProps;

export default compose<MarketRowProps, MarketRowOuterProps>(
    withNavigation,
    inject('Ticker'),
    observer,
)(MarketRow);
