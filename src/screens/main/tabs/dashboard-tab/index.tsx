import React from 'react';
import { inject, observer } from 'mobx-react/native';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { KunaAssetUnit } from 'kuna-sdk';
import AnalTracker from 'utils/ga-tracker';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';


type State = {
    refreshing: boolean;
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};

type OuterProps = {};
type Props = OuterProps & mobx.ticker.WithTickerProps;

// @ts-ignore
@inject('Ticker')
@observer
export default class MarketTab extends React.Component<Props, State> {
    public state: State = {
        refreshing: false,
        favorite: false,
        activeAsset: undefined,
    };


    public render(): JSX.Element {
        return (
            <ScrollView
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                refreshControl={this.__renderRefreshControl()}
            >

                {this.__renderBaseBox()}

            </ScrollView>
        );
    }


    private __renderBaseBox = () => {
        const { Ticker } = this.props;

        const volume = Ticker.getMarketVolume();

        return (
            <View style={styles.box}>
                <SpanText style={{ fontSize: 20 }}>${volume.format('0,0')}</SpanText>
                <SpanText style={{ fontSize: 12 }}>Total 24H Volume</SpanText>
            </View>
        );
    };


    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('update_markets');

        try {
            await this.props.Ticker.fetchTickers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
    box: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        backgroundColor: Color.GrayLight,
        padding: 10,
    },
    listItemSeparator: {
        borderBottomColor: Color.GrayLight,
        borderBottomWidth: 1,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
    },

    filterTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
});
