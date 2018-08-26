import React from 'react';
import { kunaMarketMap, KunaTicker } from 'kuna-sdk';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-native';
import { Text, View, TouchableOpacity } from 'react-native';
import { compose } from 'recompose';

import { tracker } from 'utils/ga-tracker';
import { Topic } from 'components/topic';

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
                <Topic title={`${currentMarket.baseAsset} / ${currentMarket.quoteAsset}`}
                       leftContent={(
                           <Link to={'/'} component={TouchableOpacity}>
                               <Text style={styles.backButton}>Back</Text>
                           </Link>
                       )}
                />

                <View style={styles.pairContainer}>
                    <Text>{ticker ? ticker.last : '--'}</Text>
                </View>
            </View>
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