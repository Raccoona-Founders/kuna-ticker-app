import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';
import { chain } from 'lodash';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaApiClient, KunaAsset, kunaMarketMap, KunaOrderBook, KunaTicker } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import InfoUnit from 'components/info-unit';
import { SpanText } from 'components/span-text';
import { Color } from 'styles/variables';
import styles from './depth.style';

type State = {
    depth: undefined | KunaOrderBook;
};

class DepthScreen extends React.PureComponent<DepthScreenProps, State> {
    public state: State = {
        depth: undefined,
    };

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.props.navigation.getParam('marketSymbol');

        AnalTracker.trackScreen(`market/depth/${marketSymbol}`, 'DepthScreen');

        const depth = await kunaApiClient.getOrderBook(marketSymbol);
        this.setState({ depth });
    }

    public render(): JSX.Element {
        const { depth } = this.state;
        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        const quoteAsset = getAsset(kunaMarket.quoteAsset);

        return (
            <View style={styles.container}>
                <View style={styles.topic}>
                    <SpanText style={styles.topicTitle}>{kunaMarket.baseAsset} / {kunaMarket.quoteAsset}</SpanText>
                </View>

                {depth ? (
                    <View style={styles.depthSheetContainer}>
                        {this._renderDepthTenPercent(depth, quoteAsset)}
                        {this._renderDepthSheet(depth)}
                    </View>
                ) : <ActivityIndicator />}


            </View>
        );
    }

    protected _renderDepthTenPercent(depth: KunaOrderBook, quoteAsset: KunaAsset): JSX.Element | undefined {
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
                    value={Numeral(bidDepth).format('0,0.[00]') + ' ' + quoteAsset.key}
                    valueColor={Color.Main}
                />

                <InfoUnit
                    topic="Ask 10%"
                    value={Numeral(asksDepth).format('0,0.[00]') + ' ' + quoteAsset.key}
                    valueColor={Color.Danger}
                />
            </>
        );
    }

    protected _renderDepthSheet(depth: KunaOrderBook): JSX.Element {
        return (
            <View style={styles.depthSheet}>
                <View style={[styles.depthSheetSide]}>
                    {chain(depth.bids).slice(0, 10).map(([price, value], index: number) => {
                        return (
                            <View key={index}>
                                <SpanText>{price} / {value}</SpanText>
                            </View>
                        );
                    }).value()}
                </View>

                <View style={[styles.depthSheetSide]}>
                    {chain(depth.asks).slice(0, 10).map(([price, value], index: number) => {
                        return (
                            <View key={index}>
                                <SpanText>{price} / {value}</SpanText>
                            </View>
                        );
                    }).value()}
                </View>
            </View>
        )
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
)(DepthScreen);


