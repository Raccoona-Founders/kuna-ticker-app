import React from 'react';
import { map, filter, findIndex } from 'lodash';
import { ScrollView, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Swiper from 'react-native-swiper';
import { kunaMarketMap, KunaMarket, KunaTicker, KunaAssetUnit } from 'kuna-sdk';

import { tracker } from 'utils/ga-tracker';
import { QuoteAssetsTab, quoteAssets } from './quote-assets-tab';
import { MarketRow } from './market-row';
import { mainStyles } from './styles';

type MainScreenState = {
    tickers: KunaTicker[];
    swipeIndex: number;
};

export class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        tickers: [],
        swipeIndex: 0,
    };

    protected swiper?: any;

    public componentDidMount() {
        tracker.trackScreenView(`main/${this.currentSymbol}`);
    }

    public render(): JSX.Element {
        const { swipeIndex } = this.state;

        return (
            <View style={mainStyles.container}>
                <QuoteAssetsTab
                    currentSymbol={quoteAssets[swipeIndex]}
                    onChooseAsset={this.handleChooseAsset}
                />

                <Swiper
                    style={mainStyles.swiperWrapper}
                    showsButtons={false}
                    showsPagination={false}
                    autoplay={false}
                    onIndexChanged={this.onChangeIndex}
                    ref={(elem: Swiper) => this.swiper = elem}
                >
                    {quoteAssets.map((symbol: KunaAssetUnit, index: number) => {
                        const actualMarketMap = filter(kunaMarketMap, { quoteAsset: symbol });

                        return (
                            <ScrollView style={mainStyles.flatList} key={index}>
                                {map(actualMarketMap, (market: KunaMarket) => (
                                    <MarketRow market={market} key={market.key} />
                                ))}
                            </ScrollView>
                        );
                    })}
                </Swiper>
            </View>
        );
    }

    protected get currentSymbol(): KunaAssetUnit {
        return this.props.navigation.getParam('symbol', KunaAssetUnit.UkrainianHryvnia);
    }

    protected onChangeIndex = (index: number) => {
        this.setState({ swipeIndex: index });

        console.log('onChangeIndex', index);
    };

    protected handleChooseAsset = (symbol: string) => {
        const { swipeIndex } = this.state;
        const newIndex = findIndex(quoteAssets, asset => asset === symbol);

        console.log('swipeIndex', swipeIndex);
        console.log('newIndex', newIndex);

        if (newIndex !== swipeIndex) {
            console.log('scrollTo', newIndex - swipeIndex);
            this.swiper.scrollBy(newIndex - swipeIndex);
            this.setState({ swipeIndex: newIndex });
        }
    };
}

type MainScreenProps = NavigationInjectedProps;
