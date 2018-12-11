import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';
import { slice, map, maxBy, meanBy, sumBy } from 'lodash';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { kunaApiClient, KunaAsset, KunaMarket, kunaMarketMap, KunaOrderBook, KunaTicker } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import InfoUnit from 'components/info-unit';
import { SpanText } from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import { Color } from 'styles/variables';
import styles from './depth.style';
import OrderRow from './order-row';

type State = {
    depth: undefined | KunaOrderBook;
};

const ORDER_DEPTH = 35;

type SideRowsProps = {
    side: 'ask' | 'bid';
    items: [number, number][];
    market: KunaMarket;
};

const SideRows = (props: SideRowsProps): JSX.Element => {
    const items = slice(props.items, 0, ORDER_DEPTH);

    const avr = meanBy(items, ([price, value]) => +value);
    const max = maxBy(items, ([price, value]) => +value);
    const totalValue = sumBy(items, ([price, value]) => +value);

    const maxValue = max ? max[1] : 0;
    let cumulativeValue = 0;

    return (
        <>
            {map(items, ([price, value], index: number) => {
                cumulativeValue += (+value);

                return (
                    <OrderRow key={index}
                              price={price}
                              value={value}
                              cumulativeValue={cumulativeValue}
                              totalValue={totalValue}
                              type={props.side}
                              maxValue={maxValue}
                              avrValue={avr}
                              market={props.market}
                    />
                );
            })}
        </>
    );
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
            <ShadeScrollCard>
                <View style={styles.container}>
                    <View style={styles.topic}>
                        <SpanText style={styles.topicText}>Order book</SpanText>
                        <SpanText style={[styles.topicText, styles.topicTextMarket]}>
                            {kunaMarket.baseAsset} / {kunaMarket.quoteAsset}
                        </SpanText>
                    </View>

                    {depth ? (
                        <View style={styles.depthSheetContainer}>
                            {this._renderDepthSheet(depth)}
                        </View>
                    ) : <ActivityIndicator />}
                </View>
            </ShadeScrollCard>
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

        return (
            <View style={styles.depthSheet}>
                <View style={[styles.depthSheetSide]}>
                    <View style={styles.depthHeader}>
                        <SpanText style={styles.depthHeaderCell}>Amount ({kunaMarket.baseAsset})</SpanText>
                        <SpanText style={styles.depthHeaderCell}>Price ({kunaMarket.quoteAsset})</SpanText>
                    </View>
                    <SideRows side="bid" items={depth.bids} market={kunaMarket} />
                </View>

                <View style={[styles.depthSheetSide]}>
                    <View style={styles.depthHeader}>
                        <SpanText style={styles.depthHeaderCell}>Price ({kunaMarket.quoteAsset})</SpanText>
                        <SpanText style={styles.depthHeaderCell}>Amount ({kunaMarket.baseAsset})</SpanText>
                    </View>
                    <SideRows side="ask" items={depth.asks} market={kunaMarket} />
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


