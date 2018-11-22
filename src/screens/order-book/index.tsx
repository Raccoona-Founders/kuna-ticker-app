import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';
import { slice, map, maxBy, meanBy } from 'lodash';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaApiClient, KunaAsset, kunaMarketMap, KunaOrderBook, KunaTicker } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import InfoUnit from 'components/info-unit';
import { SpanText } from 'components/span-text';
import { Color } from 'styles/variables';
import styles from './depth.style';
import OrderRow from './order-row';

type State = {
    depth: undefined | KunaOrderBook;
};


class OrderBookScreen extends React.PureComponent<DepthScreenProps, State> {
    public state: State = {
        depth: undefined,
    };

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.props.navigation.getParam('marketSymbol');

        AnalTracker.trackScreen(`market/order-book/${marketSymbol}`, 'OrderBookScreen');

        setTimeout(async () => {
            const depth = await kunaApiClient.getOrderBook(marketSymbol);
            this.setState({ depth });
        }, 400);
    }

    public render(): JSX.Element {
        const { depth } = this.state;
        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        return (
            <View style={styles.container}>
                <View style={styles.topic}>
                    <SpanText style={styles.topicTitle}>{kunaMarket.baseAsset} / {kunaMarket.quoteAsset}</SpanText>
                </View>

                {depth ? (
                    <View style={styles.depthSheetContainer}>
                        {/*<View>{this._renderDepthTenPercent(depth, baseAsset)}</View>*/}
                        {this._renderDepthSheet(depth)}
                    </View>
                ) : <ActivityIndicator />}


            </View>
        );
    }

    protected _renderDepthTenPercent(depth: KunaOrderBook, baseAsset: KunaAsset): JSX.Element | undefined {
        const { ticker } = this.props;

        const minPrice = +ticker.last * 0.9;
        const bidDepth: number = depth.bids.reduce((sum: number, [price, value]) => (
            +price >= minPrice ? sum + (+value) : sum
        ), 0);

        const maxPrice = +ticker.last * 1.1;
        const asksDepth: number = depth.asks.reduce((sum: number, [price, value]) => (
            +price <= maxPrice ? sum + (+value) : sum
        ), 0);

        return (
            <>
                <InfoUnit
                    topic="Bid 10%"
                    value={Numeral(bidDepth).format('0,0.[00]') + ' ' + baseAsset.key}
                    valueColor={Color.Main}
                />

                <InfoUnit
                    topic="Ask 10%"
                    value={Numeral(asksDepth).format('0,0.[00]') + ' ' + baseAsset.key}
                    valueColor={Color.Danger}
                />
            </>
        );
    }

    protected _renderDepthSheet(depth: KunaOrderBook): JSX.Element {
        const { usdRate } = this.props;

        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        const bidItems = slice(depth.bids, 0, 20);
        const avrBid = meanBy(bidItems, ([price, value]) => +value);
        const maxBid = maxBy(bidItems, ([price, value]) => +value);
        const maxBidValue = maxBid ? maxBid[1] : 0;


        const askItems = slice(depth.asks, 0, 20);
        const avrAsk = meanBy(askItems, ([price, value]) => +value);
        const maxAsk = maxBy(askItems, ([price, value]) => +value);
        const maxAskValue = maxAsk ? maxAsk[1] : 0;

        return (
            <View style={styles.depthSheet}>
                <View style={[styles.depthSheetSide]}>
                    <View style={styles.depthHeader}>
                        <SpanText style={styles.depthHeaderCell}>Amount ({kunaMarket.baseAsset})</SpanText>
                        <SpanText style={styles.depthHeaderCell}>Price ({kunaMarket.quoteAsset})</SpanText>
                    </View>

                    {map(bidItems, ([price, value], index: number) => (
                        <OrderRow key={index}
                                  price={price}
                                  value={value}
                                  type='bid'
                                  maxValue={maxBidValue}
                                  avrValue={avrBid}
                                  market={kunaMarket}
                        />
                    ))}
                </View>

                <View style={[styles.depthSheetSide]}>
                    <View style={styles.depthHeader}>
                        <SpanText style={styles.depthHeaderCell}>Price ({kunaMarket.quoteAsset})</SpanText>
                        <SpanText style={styles.depthHeaderCell}>Amount ({kunaMarket.baseAsset})</SpanText>
                    </View>

                    {map(askItems, ([price, value], index: number) => (
                        <OrderRow key={index}
                                  price={price}
                                  value={value}
                                  type='ask'
                                  maxValue={maxAskValue}
                                  avrValue={avrAsk}
                                  market={kunaMarket}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

type DepthScreenOuterProps = NavigationInjectedProps<{ marketSymbol: string; }>;
type ConnectedProps = {
    ticker: KunaTicker;
    usdRate: number;
}

type DepthScreenProps = DepthScreenOuterProps & ConnectedProps;


const mapStateToProps = (store: KunaStore, ownProps: DepthScreenOuterProps): ConnectedProps => {
    const symbol = ownProps.navigation.getParam('marketSymbol');

    if (!symbol) {
        throw new Error('No symbol');
    }

    return {
        ticker: store.ticker.tickers[symbol],
        usdRate: store.ticker.usdRate,
    };
};

export default compose<DepthScreenProps, DepthScreenOuterProps>(
    connect(mapStateToProps),
)(OrderBookScreen);


