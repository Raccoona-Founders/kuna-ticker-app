import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { getAsset, kunaMarketMap, KunaTicker } from 'kuna-sdk';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { RouteComponentProps } from 'react-router-native';

import { CoinIcon } from 'components/coin-icon';
import { tracker } from 'utils/ga-tracker';
import { Topic } from 'components/topic';
import { InfoUnit } from './info-unit';

import { styles } from './styles';

export class MarketScreenComponent extends React.PureComponent<MarketScreenProps> {

    public componentDidMount(): void {
        const {symbol} = this.props.match.params;

        tracker.trackScreenView(`market/${symbol}`);
    }

    public render(): JSX.Element {
        const {match, ticker} = this.props;
        const {symbol} = match.params;
        const currentMarket = kunaMarketMap[symbol];

        return (
            <View style={{flex: 1}}>
                <Topic title={this.renderTopicTitle()} leftContent={this.renderTopicBackButton()}/>
                {ticker ? this.renderMarketTicker() : ''}
            </View>
        );
    }

    protected renderMarketTicker() {

        const {match, ticker} = this.props;
        const {symbol} = match.params;
        const currentMarket = kunaMarketMap[symbol];

        const quoteAsset = getAsset(currentMarket.quoteAsset);
        const baseAsset = getAsset(currentMarket.baseAsset);

        return (
            <ScrollView style={styles.pairContainer}>
                <View style={styles.priceContainer}>
                    <Text>{Numeral(ticker.last).format(quoteAsset.format)} {quoteAsset.key}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <InfoUnit topic={`Volume ${baseAsset.key}`}
                              value={Numeral(ticker.vol).format('0,0.[00]')}
                    />

                    <InfoUnit topic={`Volume ${quoteAsset.key}`}
                              value={Numeral(ticker.vol).multiply(ticker.last).format('0,0.[00]')}
                    />

                    <InfoUnit topic="Low Price"
                              value={Numeral(ticker.low).format(quoteAsset.format)}
                    />

                    <InfoUnit topic="High Price"
                              value={Numeral(ticker.high).format(quoteAsset.format)}
                    />
                </View>

            </ScrollView>
        )
    }

    protected renderTopicTitle() {
        const {match} = this.props;
        const {symbol} = match.params;
        const currentMarket = kunaMarketMap[symbol];

        return (
            <View style={styles.topic}>
                <CoinIcon asset={getAsset(currentMarket.baseAsset)}
                          size={20}
                          style={{marginRight: 6}}
                          withShadow={false}
                />
                <Text>{currentMarket.baseAsset} / {currentMarket.quoteAsset}</Text>
            </View>
        );
    }

    protected renderTopicBackButton() {
        return (
            <TouchableOpacity onPress={() => this.props.history.goBack()}>
                <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
        );
    }
}

type MarketScreenOuterProps = RouteComponentProps<{ symbol: string; }>;
type ConnectedProps = {
    ticker: KunaTicker;
}

type MarketScreenProps = ConnectedProps & MarketScreenOuterProps;

const mapStateToProps = (store: KunaStore, ownProps: MarketScreenProps): ConnectedProps => {
    const {symbol} = ownProps.match.params;

    return {
        ticker: store.ticker.tickers[symbol],
    };
};

export const MarketScreen = compose<MarketScreenProps, MarketScreenOuterProps>(
    connect(mapStateToProps),
)(MarketScreenComponent);