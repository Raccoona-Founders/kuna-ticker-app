import React from 'react';
import { map, min, max } from 'lodash';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { KunaMarket } from 'kuna-sdk';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { fetchKunaTradeHistory } from 'utils/kuna-client';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';

import LastPriceSvg from './last-price.element';
import LimitPriceSvg from './limit-price.element';
import BottomOverlaySvg from './bottom-overlay.element';

import ChartStyles from './chart.style';

const IntervalMap = {
    '24H': ['30', 1],
    '1W': ['60', 7],
    '1M': ['1D', 30],
    '3M': ['1D', 90],
    '6M': ['1D', 180],
    '1Y': ['1D', 360],
    'MAX': ['1D', 1000],
};

type PriceChartProps = {
    market: KunaMarket;
};


export default class Chart extends React.PureComponent<PriceChartProps> {
    public state: any = {
        currentInterval: '1M',
        ready: false,
        data: [],
    };

    public async componentDidMount(): Promise<void> {
        setTimeout(this.__fetchTradeHistory, 400);
    }


    public render(): JSX.Element {

        const { currentInterval, ready } = this.state;

        return (
            <View>
                <View style={ChartStyles.sheet.chartContainer}>
                    {this.__renderChart()}
                </View>

                <View style={ChartStyles.sheet.tagContainer}>
                    {map(IntervalMap, (item: any[], index: string) => {
                        const onPress = () => {
                            if (!ready || currentInterval === index) {
                                return;
                            }

                            this.setState({ currentInterval: index }, this.__fetchTradeHistory);
                        };

                        return (
                            <TouchableOpacity key={index} onPress={onPress}>
                                <SpanText style={[
                                    ChartStyles.sheet.tagUnit,
                                    currentInterval === index ? ChartStyles.sheet.tagUnitActive : undefined,
                                ]}>
                                    {index}
                                </SpanText>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }


    private __renderChart = () => {
        const { market } = this.props;
        const { data } = this.state;

        if (data.length < 2) {
            return <ActivityIndicator color={Color.Main} />;
        }

        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const lastPrice = data[data.length - 1];
        const depth = maxValue - minValue;

        const contentInset = { top: 0, bottom: 12 };

        return (
            <>
                {this.state.ready ? undefined : (
                    <ActivityIndicator color={Color.White} style={ChartStyles.sheet.loader} />
                )}

                <AreaChart
                    style={{ flex: 1 }}
                    data={data}
                    contentInset={contentInset}
                    curve={shape.curveNatural}
                    gridMax={maxValue + depth * 0.1}
                    gridMin={minValue - depth * 0.1}
                    svg={{ fill: Color.Main, strokeWidth: 6, stroke: Color.Main, strokeOpacity: 0.25 }}
                >
                    <BottomOverlaySvg minValue={minValue} />
                    <LastPriceSvg lastPrice={lastPrice} />
                    <LimitPriceSvg price={minValue} format={market.format} side="bottom" lastPrice={lastPrice} />
                    <LimitPriceSvg price={maxValue} format={market.format} side="top" lastPrice={lastPrice} />
                </AreaChart>
            </>
        );
    };

    private __fetchTradeHistory = async () => {
        const market = this.props.market;

        this.setState({ ready: false });

        // @ts-ignore
        const currentInterval = IntervalMap[this.state.currentInterval];

        const history = await fetchKunaTradeHistory(market.key, currentInterval[0], currentInterval[1]);

        this.setState({
            ready: true,
            data: history.c,
        });
    };
}
