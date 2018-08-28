import React from 'react';
import Numeral from 'numeral';
import { compose } from 'recompose';
import { getAsset, kunaMarketMap, KunaTicker } from 'kuna-sdk';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { RouteComponentProps } from 'react-router-native';

import { CoinIcon } from 'components/coin-icon';
import { tracker } from 'utils/ga-tracker';
import { numFormat } from 'utils/number-helper';
import { Topic } from 'components/topic';

import { Calculator } from './calculator';
import { InfoUnit } from './info-unit';
import { styles } from './styles';

export class MarketScreenComponent extends React.PureComponent<MarketScreenProps> {

    public componentDidMount(): void {
        const {symbol} = this.props.match.params;
        const currentMarket = kunaMarketMap[symbol];

        tracker.trackScreenView(
            `market/${currentMarket.quoteAsset}-${currentMarket.baseAsset}`,
        );
    }


    public render(): JSX.Element {
        const {ticker} = this.props;

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
            <View style={styles.marketInfoContainer}>
                <View style={styles.priceContainer}>
                    <View style={styles.priceText}>
                        <Text style={styles.priceTextValue}>{numFormat(ticker.last, quoteAsset.format)}</Text>
                        <Text style={styles.priceTextAsset}>{quoteAsset.key}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <InfoUnit topic={`Volume ${baseAsset.key}`}
                              value={numFormat(ticker.vol)}
                    />

                    <InfoUnit topic={`Volume ${quoteAsset.key}`}
                              value={numFormat(Numeral(ticker.vol).multiply(ticker.last))}
                    />

                    <InfoUnit topic="Low Price"
                              value={numFormat(ticker.low, quoteAsset.format)}
                    />

                    <InfoUnit topic="High Price"
                              value={numFormat(ticker.high, quoteAsset.format)}
                    />
                </View>

                {ticker.last ? <Calculator market={currentMarket} ticker={ticker}/> : undefined}
            </View>
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
