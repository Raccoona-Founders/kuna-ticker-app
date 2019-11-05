import { useObserver } from 'mobx-react-lite';
import React from 'react';
import numeral from 'numeral';
import { View, ActivityIndicator } from 'react-native';
import { getAsset, KunaAssetUnit, KunaMarket } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import SpanText from 'components/span-text';
import RippleNotice from 'components/ripple-notice';
import InfoUnit from 'components/info-unit';
import { useStores } from 'utils/mobx';
import PriceChangeBox from './change-price-box';
import Chart from './chart';
import MinMaxIndicator from './min-max-indicator';
import Favorite from './favorite';
import marketStyle from '../market.style';

import { DefaultStyles } from 'styles/variables';

type MarketScreenProps = {
    marketSymbol: string;
    market: KunaMarket;
};

export default function MarketBody(props: MarketScreenProps): JSX.Element {
    const { market } = props;
    const { Ticker } = useStores();

    const symbol = props.marketSymbol;
    const { tick, usdPrice } = useObserver(() => {
        return {
            tick: Ticker.getTicker(symbol),
            usdPrice: Ticker.usdCalculator.getPrice(symbol),
        };
    });

    if (!tick) {
        return <View><ActivityIndicator /></View>;
    }

    const quoteAsset = getAsset(market.quoteAsset);
    const baseAsset = getAsset(market.baseAsset);

    return (
        <>
            <View style={marketStyle.topic}>
                <CoinIcon asset={getAsset(market.baseAsset)}
                          naked={true}
                          withShadow={false}
                          size={68}
                          style={{ marginRight: 10 }}
                />

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={marketStyle.topicName}>
                        <SpanText style={marketStyle.topicNameUnit}>
                            {market.baseAsset}/{market.quoteAsset}
                        </SpanText>
                        <SpanText style={marketStyle.topicNameFullname}>
                            {baseAsset.name} to {quoteAsset.name}
                        </SpanText>
                    </View>

                    <Favorite market={market} />
                </View>
            </View>

            <View style={marketStyle.separator} />

            <View style={[marketStyle.section, marketStyle.sectionPrice]}>
                <View>
                    <SpanText style={marketStyle.price}>
                        {numFormat(tick.lastPrice || 0, market.format)} {quoteAsset.key}
                    </SpanText>

                    <PriceChangeBox
                        value={tick.dailyChangePercent}
                        style={{ position: 'absolute', right: 0, top: 0 }}
                    />

                    {usdPrice && (
                        <SpanText style={marketStyle.priceUsd}>
                            ${usdPrice.format('0,0.[00]')}
                        </SpanText>
                    )}
                </View>
            </View>

            <View style={{ paddingBottom: 20 }}>
                <Chart market={market} />

                <View style={[marketStyle.section, marketStyle.sectionInformation]}>
                    <InfoUnit topic="Vol $"
                              value={numFormat(numeral(tick.volume).multiply(usdPrice.value()), '$0,0.[00]')}
                              style={marketStyle.infoUnit}
                              valueStyle={DefaultStyles.boldFont}
                    />

                    <InfoUnit topic={`Vol ${baseAsset.key}`}
                              value={numFormat(tick.volume)}
                              style={marketStyle.infoUnit}

                    />

                    <InfoUnit topic={`Vol ${quoteAsset.key}`}
                              value={numFormat(numeral(tick.volume).multiply(tick.lastPrice || 0))}
                              style={marketStyle.infoUnit}
                    />
                </View>

                <MinMaxIndicator
                    market={market}
                    min={tick.low}
                    max={tick.high}
                    price={tick.lastPrice || 0}
                />

                {baseAsset.key === KunaAssetUnit.Ripple ? (
                    <>
                        <View style={marketStyle.separator} />
                        <RippleNotice />
                    </>
                ) : undefined}
            </View>
        </>
    );
}
