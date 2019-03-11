import React from 'react';
import Numeral from 'numeral';
import { View, StyleSheet, Dimensions } from 'react-native';
import { KunaV3Ticker, kunaMarketMap, getAsset } from 'kuna-sdk';
import { UsdCalculator } from 'utils/currency-rate';
import SpanText from 'components/span-text';
import { Color, DefaultStyles } from 'styles/variables';
import { CoinIcon } from 'components/coin-icon';

const { width } = Dimensions.get('window');

type FavoriteProps = {
    tickers: KunaV3Ticker[];
    usdCalculator: UsdCalculator;
};

export default class FavoriteTickers extends React.PureComponent<FavoriteProps> {
    public render(): JSX.Element {
        const { tickers } = this.props;

        return (
            <View style={styles.container}>
                <SpanText style={styles.title}>Favorites</SpanText>

                {tickers.map(this.__itemRenderer())}
            </View>
        );
    }


    private __itemRenderer = () => {
        const { usdCalculator } = this.props;

        return (ticker: KunaV3Ticker) => {

            const { lastPrice } = ticker;
            const market = kunaMarketMap[ticker.symbol];
            const baseAsset = getAsset(market.baseAsset);

            const volume = Numeral(ticker.volume).multiply(usdCalculator.getPrice(market.key).value());

            return (
                <View style={styles.box} key={ticker.symbol}>

                    <View style={styles.boxHead}>
                        <CoinIcon asset={baseAsset}
                                  withShadow={false}
                                  naked={true}
                                  size={32}
                                  style={{ marginLeft: -8, marginRight: 2 }}
                        />

                        <SpanText>
                            {market.baseAsset}/{market.quoteAsset}
                        </SpanText>
                    </View>

                    <SpanText style={{ fontSize: 18, ...DefaultStyles.boldFont }}>
                        {Numeral(lastPrice).format(market.format)} {market.quoteAsset}
                    </SpanText>
                    <SpanText>Vol: ${volume.format('0,0')}</SpanText>
                </View>
            );
        };
    };
}

const styles = StyleSheet.create({
    title: {
        width: '100%',
        fontSize: 12,
        textTransform: 'uppercase',
        color: Color.GrayBlues,
        marginBottom: 10,
    },
    container: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    box: {
        width: (width - 20 * 3) / 2,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: Color.GrayLight,
        padding: 10,
    },

    boxHead: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});
