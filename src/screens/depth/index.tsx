import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { getAsset, kunaApiClient, KunaAsset, kunaMarketMap, KunaOrderBook, KunaTicker } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import InfoUnit from 'components/info-unit';
import { SpanText } from 'components/span-text';
import styles from './depth.style';
import { Color } from 'styles/variables';



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
        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const kunaMarket = kunaMarketMap[marketSymbol];

        const quoteAsset = getAsset(kunaMarket.quoteAsset);

        return (
            <View style={styles.container}>
                <View style={styles.topic}>
                    <SpanText style={styles.topicTitle}>{kunaMarket.baseAsset} / {kunaMarket.quoteAsset}</SpanText>
                </View>

                <View style={styles.depthSheetContainer}>
                    {this._renderDepth(quoteAsset)}
                </View>
            </View>
        );
    }

    protected _renderDepth(quoteAsset: KunaAsset): JSX.Element | undefined {
        const { depth } = this.state;

        if (!depth) {
            return <ActivityIndicator />;
        }

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
                    valueColor={Color.Danger}
                />

                <InfoUnit
                    topic="Ask 10%"
                    value={Numeral(asksDepth).format('0,0.[00]') + ' ' + quoteAsset.key}
                    valueColor={Color.Main}
                />
            </>
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
)(DepthScreen);


