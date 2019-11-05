import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { KunaMarket } from 'kuna-sdk';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from 'styles/variables';

type FavoriteOuterProps = {
    market: KunaMarket;
};

type FavoriteProps
    = FavoriteOuterProps
    & mobx.ticker.WithTickerProps;

class Favorite extends React.Component<FavoriteProps> {
    public render(): JSX.Element {
        const { market, Ticker } = this.props;

        return (
            <TouchableOpacity onPress={this.__pressFavorite}>
                <Icon name="star"
                      style={{ color: Ticker.favorite.exists(market.key) ? Color.Main : Color.GrayNoactive }}
                      size={24}
                      solid
                />
            </TouchableOpacity>
        );
    }

    private __pressFavorite = () => {
        const { market, Ticker } = this.props;
        const fv = Ticker.favorite;

        fv.exists(market.key) ? fv.remove(market.key) : fv.add(market.key);
    };
}

export default compose<FavoriteProps, FavoriteOuterProps>(
    inject('Ticker'),
    observer,
)(Favorite);
