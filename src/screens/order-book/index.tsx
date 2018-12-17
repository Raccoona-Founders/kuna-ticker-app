import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';
import { map, maxBy, meanBy, sumBy } from 'lodash';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { KunaMarket, kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import { SpanText } from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import kunaClient from 'utils/kuna-api';
import { _ } from 'utils/i18n';
import OrderBookProcessor from 'utils/order-book-processor';
import styles from './depth.style';
import OrderRow from './order-row';

const ORDER_DEPTH = 35;

type SideRowsProps = {
    side: 'ask' | 'bid';
    orderBook: OrderBookProcessor;
    market: KunaMarket;
};

const SideRows = (props: SideRowsProps): JSX.Element => {
    const items = props.side === 'ask'
        ? props.orderBook.getAsk()
        : props.orderBook.getBid();

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


type State = {
    orderBook?: OrderBookProcessor;
};

class OrderBookScreen extends React.PureComponent<DepthScreenProps, State> {
    public state: State = {
        orderBook: undefined,
    };


    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.props.navigation.getParam('marketSymbol');

        AnalTracker.trackScreen(`market/order-book/${marketSymbol}`, 'OrderBookScreen');

        setTimeout(async () => {
            const orderBook = await kunaClient.getOrderBook(marketSymbol);

            this.setState({
                orderBook: new OrderBookProcessor(orderBook, ORDER_DEPTH),
            });
        }, 400);
    }


    public render(): JSX.Element {
        const { orderBook } = this.state;
        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        return (
            <ShadeScrollCard>
                <View style={styles.container}>
                    <View style={styles.topic}>
                        <SpanText style={styles.topicText}>{_('market.order-book')}</SpanText>
                        <SpanText style={[styles.topicText, styles.topicTextMarket]}>
                            {kunaMarket.baseAsset} / {kunaMarket.quoteAsset}
                        </SpanText>
                    </View>

                    {orderBook ? (
                        <View style={styles.depthSheetContainer}>
                            {this._renderDepthSheet(orderBook)}
                        </View>
                    ) : <ActivityIndicator />}
                </View>
            </ShadeScrollCard>
        );
    }


    protected _renderDepthSheet(orderBook: OrderBookProcessor): JSX.Element {
        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        return (
            <View style={styles.depthSheet}>
                <View style={[styles.depthSheetSide]}>
                    <View style={styles.depthHeader}>
                        <SpanText style={styles.depthHeaderCell}>
                            {_('market.amount-asset', { asset: kunaMarket.baseAsset })}
                        </SpanText>
                        <SpanText style={styles.depthHeaderCell}>
                            {_('market.price-asset', { asset: kunaMarket.quoteAsset })}
                        </SpanText>
                    </View>
                    <SideRows side="bid" orderBook={orderBook} market={kunaMarket} />
                </View>

                <View style={[styles.depthSheetSide]}>
                    <View style={styles.depthHeader}>
                        <SpanText style={styles.depthHeaderCell}>
                            {_('market.price-asset', { asset: kunaMarket.quoteAsset })}
                        </SpanText>
                        <SpanText style={styles.depthHeaderCell}>
                            {_('market.amount-asset', { asset: kunaMarket.baseAsset })}
                        </SpanText>
                    </View>
                    <SideRows side="ask" orderBook={orderBook} market={kunaMarket} />
                </View>
            </View>
        );
    }
}


type DepthScreenOuterProps = NavigationInjectedProps<{ marketSymbol: string; }>;
type ConnectedProps = {
    ticker: KunaV3Ticker;
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


