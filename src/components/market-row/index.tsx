import React from 'react';
import numeral from 'numeral';
import { View, TouchableOpacity } from 'react-native';
import { KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import SpanText from 'components/span-text';
import ChangePercent from 'components/change-percent';
import { MarketNameCell } from './market-name-cell';
import styles from './market-row.styles';

export default class MarketRow extends React.Component<MarketRowProps> {
    public render(): JSX.Element {
        const {market, ticker, usdPrice, onPress, visible = true} = this.props;

        if (!ticker || !ticker.lastPrice) {
            return <View/>;
        }

        const dailyChangeStyles = [
            styles.dailyChange,
            ticker.dailyChangePercent > 0 ? styles.dailyChangeUp : styles.dailyChangeDown,
        ];

        const containerStyle = [
            styles.listItemLink,
            visible ? undefined : styles.listItemLinkInvisible,
        ];

        return (
            <TouchableOpacity onPress={ticker ? onPress : undefined} style={containerStyle}>
                <View style={styles.listItem}>
                    <MarketNameCell market={market}/>

                    <View style={styles.tickerCell}>
                        <View style={styles.priceBox}>
                            <SpanText style={styles.priceValue}>
                                {ticker.lastPrice ? numFormat(ticker.lastPrice || 0, market.format) : '—'}
                                {' '}
                                {market.quoteAsset}
                            </SpanText>
                        </View>

                        <View style={styles.secondaryInfo}>
                            <SpanText style={styles.marketVolume}>
                                ${usdPrice.format('0,0.00')}
                            </SpanText>

                            <ChangePercent percent={ticker.dailyChangePercent}
                                           style={{marginLeft: 8}}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

type MarketRowProps = {
    market: KunaMarket;
    usdPrice: Numeral;
    ticker?: KunaV3Ticker;
    visible?: boolean;
    onPress?: () => void;
};
