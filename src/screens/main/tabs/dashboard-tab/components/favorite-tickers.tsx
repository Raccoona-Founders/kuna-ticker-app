import React from 'react';
import Numeral from 'numeral';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { KunaV3Ticker, kunaMarketMap, getAsset, KunaMarket } from 'kuna-sdk';
import { useNavigation } from 'react-navigation-hooks';
import { UsdCalculator } from 'utils/currency-rate';
import SpanText from 'components/span-text';
import { Color, DefaultStyles } from 'styles/variables';
import ChangePercent from 'components/change-percent';
import { CoinIcon } from 'components/coin-icon';
import RouteKeys from 'router/route-keys';


const { width } = Dimensions.get('window');

type FavoriteProps = {
    tickers: KunaV3Ticker[];
    usdCalculator: UsdCalculator;
};


export default function FavoriteTickers(props: FavoriteProps): JSX.Element {
    const { tickers, usdCalculator } = props;
    const navigation = useNavigation();

    if (tickers.length < 1) {
        return <View />;
    }

    const onPressMarket = (market: KunaMarket) => {
        return () => {
            navigation.push(RouteKeys.Market, { symbol: market.key });
        };
    };

    return (
        <View style={styles.container}>
            <SpanText style={styles.title}>Favorites</SpanText>

            {tickers.map((ticker: KunaV3Ticker) => {
                const { lastPrice } = ticker;
                const market = kunaMarketMap[ticker.symbol];
                const baseAsset = getAsset(market.baseAsset);
                const usdPrice = usdCalculator.getPrice(market.key);

                const volume = Numeral(ticker.volume).multiply(usdPrice.value());

                return (
                    <TouchableOpacity style={styles.box} key={ticker.symbol} onPress={onPressMarket(market)}>
                        <View style={styles.boxHead}>
                            <SpanText>{market.baseAsset}/{market.quoteAsset}</SpanText>
                        </View>

                        <View style={styles.boxPrice}>
                            <SpanText style={styles.price}>
                                {Numeral(lastPrice).format(market.format)} {market.quoteAsset}
                            </SpanText>

                            <View>
                                <SpanText style={styles.priceUSD}>
                                    1 {market.baseAsset} = ${usdPrice.format('0,0.[00]')}
                                </SpanText>

                                <SpanText style={styles.priceUSD}>
                                    Vol. ${volume.format('0,0.[0]a')}
                                </SpanText>
                            </View>
                        </View>

                        <View>
                            <ChangePercent percent={ticker.dailyChangePercent} />
                        </View>


                        <CoinIcon asset={baseAsset}
                                  withShadow={false}
                                  naked={true}
                                  size={32}
                                  style={styles.boxLogo}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        width: '100%',
        fontSize: 12,
        textTransform: 'uppercase',
        color: Color.SecondaryText,
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
        borderRadius: 6,
        backgroundColor: Color.NewMilkWhite,
        padding: 10,

        shadowColor: '#000000',
        shadowOpacity: 0.07,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 2 },
    },

    boxLogo: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },

    boxHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    boxPrice: {
        marginBottom: 10,
        marginTop: 10,
    },

    price: {
        fontSize: 18,
        ...DefaultStyles.mediumFont,
    },
    priceUSD: {
        fontSize: 14,
        color: Color.SecondaryText,
    },
});
