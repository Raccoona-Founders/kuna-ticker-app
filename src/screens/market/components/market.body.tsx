import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { View, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { getAsset, KunaAssetUnit, KunaMarket, KunaOrderBook } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import { CoinIcon } from 'components/coin-icon';
import SpanText from 'components/span-text';
import RippleNotice from 'components/ripple-notice';
import InfoUnit from 'components/info-unit';

import PriceChangeBox from './change-price-box';
import Chart from './chart';
import MinMaxIndicator from './min-max-indicator';
import Favorite from './favorite';
import marketStyle from '../market.style';

import { DefaultStyles } from 'styles/variables';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

type State = {
    depth: undefined | KunaOrderBook;
    riddle?: any;
};

class MarketBody extends React.Component<MarketScreenProps, State> {
    public state: State = {
        depth: undefined,
        riddle: undefined,
    };

    public render(): JSX.Element {
        const { Ticker, market } = this.props;

        const symbol = this._currentSymbol;
        const tick = Ticker.getTicker(symbol);

        if (!tick) {
            return <View><ActivityIndicator /></View>;
        }

        const quoteAsset = getAsset(market.quoteAsset);
        const baseAsset = getAsset(market.baseAsset);
        const usdPrice = Ticker.usdCalculator.getPrice(symbol);

        return (
            <>
                <View style={marketStyle.topic}>
                    <CoinIcon asset={getAsset(market.baseAsset)}
                              naked={true}
                              withShadow={false}
                              size={68}
                              style={{ marginRight: 20 }}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

    protected get _currentSymbol(): string {
        return this.props.marketSymbol;
    }
}

type MarketScreenOuterProps = {
    marketSymbol: string;
    market: KunaMarket;
};

type MarketScreenProps
    = MarketScreenOuterProps
    & NavigationInjectedProps
    & mobx.ticker.WithTickerProps;

// @ts-ignore
export default compose<MarketScreenProps, MarketScreenOuterProps>(
    withNavigation,
    inject('Ticker'),
    observer,
)(MarketBody);
