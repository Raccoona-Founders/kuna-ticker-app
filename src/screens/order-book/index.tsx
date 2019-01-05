import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { KunaMarket, kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import kunaClient from 'utils/kuna-api';
import { _ } from 'utils/i18n';
import OrderBookProcessor from 'utils/order-book-processor';
import { SpanText } from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import InfoUnit from 'components/info-unit';
import styles from './depth.style';
import SideRows from './side-rows';
import getPrecisionMap from 'utils/presicion-map';

const ORDER_DEPTH = 30;

type State = {
    orderBook?: OrderBookProcessor;
    precisionIndex: number;
    precisionMap: number[];
};

class OrderBookScreen extends React.PureComponent<DepthScreenProps, State> {
    public state: State = {
        orderBook: undefined,
        precisionIndex: 0,
        precisionMap: [],
    };

    public constructor(props: DepthScreenProps) {
        super(props);

        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        this.state.precisionMap = getPrecisionMap(marketSymbol, kunaMarket.quoteAsset);
    }


    public get precision(): number {
        const { precisionMap, precisionIndex } = this.state;

        return precisionMap[precisionIndex - 1] || 0;
    }

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
            <ShadeScrollCard renderFooter={this.__renderOrderBookFooter}>
                <View style={styles.container}>
                    <View style={styles.topic}>
                        <SpanText style={styles.topicText}>{_('market.order-book')}</SpanText>
                        <SpanText style={[styles.topicText, styles.topicTextMarket]}>
                            {kunaMarket.baseAsset} / {kunaMarket.quoteAsset}
                        </SpanText>
                    </View>

                    {orderBook ? (
                        <View style={styles.depthSheetContainer}>
                            {this.__renderDepthSheet(kunaMarket, orderBook)}
                        </View>
                    ) : <ActivityIndicator />}
                </View>
            </ShadeScrollCard>
        );
    }


    private __renderDepthSheet(kunaMarket: KunaMarket, orderBook: OrderBookProcessor): JSX.Element {
        const precision = this.precision;
        const precisionOrderBook = orderBook.convertToPrecision(precision);

        return (
            <View style={styles.depthSheet}>
                {this.__renderPreSheet(kunaMarket, orderBook)}

                <View style={styles.depthHeader}>
                    <SpanText style={styles.depthHeaderCell}>
                        {_('market.amount-asset', { asset: kunaMarket.baseAsset })}
                    </SpanText>
                    <SpanText style={styles.depthHeaderCell}>
                        {_('market.price-asset', { asset: kunaMarket.quoteAsset })}
                    </SpanText>
                    <SpanText style={styles.depthHeaderCell}>
                        {_('market.amount-asset', { asset: kunaMarket.baseAsset })}
                    </SpanText>
                </View>

                <View style={styles.depthSheetBody}>
                    <SideRows side="bid"
                              orderBook={precisionOrderBook}
                              market={kunaMarket}
                              style={styles.depthSheetSide}
                    />

                    <SideRows side="ask"
                              orderBook={precisionOrderBook}
                              market={kunaMarket}
                              style={styles.depthSheetSide}
                    />
                </View>
            </View>
        );
    }

    private __renderPreSheet(kunaMarket: KunaMarket, orderBook: OrderBookProcessor): JSX.Element {

        const spread = orderBook.getSpread();

        return (
            <View style={styles.spreadContainer}>
                <InfoUnit
                    topic={_('order-book.spread')}
                    value={<>
                        <SpanText style={styles.spreadValue}>
                            {numeral(spread.value).format('0,0.[00000000]')} {kunaMarket.quoteAsset}
                        </SpanText>
                        <SpanText style={styles.spreadPercentage}>
                            ({numeral(spread.percentage).format('0,0.00')}%)
                        </SpanText>
                    </>}
                    valueStyle={styles.spreadValueBox}
                />
            </View>
        );
    }

    protected __renderOrderBookFooter = () => {
        const precision = this.precision;

        return (
            <View style={styles.groupingContainer}>
                <SpanText>{_('order-book.grouping')}</SpanText>

                <View style={styles.groupingButtonContainer}>
                    <SpanText style={styles.groupingValue}>
                        {precision > 0
                            ? numeral(precision).format('0,0.[000000]')
                            : _('order-book.none')}
                    </SpanText>

                    <TouchableOpacity onPress={this.__downPrecision} style={styles.groupingButton}>
                        <SpanText style={styles.groupingButtonText}>-</SpanText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.__upPrecision} style={styles.groupingButton}>
                        <SpanText style={styles.groupingButtonText}>+</SpanText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    private __downPrecision = () => {
        let nextPrecision = this.state.precisionIndex - 1;
        if (nextPrecision <= 0) {
            nextPrecision = 0;
        }

        this.setState({ precisionIndex: nextPrecision });
    };


    private __upPrecision = () => {
        let nextPrecision = this.state.precisionIndex + 1;
        if (nextPrecision > this.state.precisionMap.length) {
            nextPrecision = this.state.precisionMap.length;
        }

        this.setState({ precisionIndex: nextPrecision });
    };
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


