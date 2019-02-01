import React from 'react';
import { map, min, max } from 'lodash';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { KunaMarket } from 'kuna-sdk';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { fetchKunaTradeHistory } from 'utils/kuna-client';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';

const IntervalMap = {
    '24H': ['30', 1],
    '1W': ['60', 7],
    '1M': ['1D', 30],
    '3M': ['1D', 90],
    '6M': ['1D', 180],
    '1Y': ['1D', 360],
    '2Y': ['1D', 720],
};

type ChartProps = {
    market: KunaMarket;
};

export default class Chart extends React.PureComponent<ChartProps> {
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
                <View style={{ height: 200, justifyContent: 'center' }}>
                    {this.__renderChart()}
                </View>

                <View style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                    {map(IntervalMap, (item: any[], index: string) => {

                        const onPress = () => {
                            if (!ready || currentInterval === index) {
                                return;
                            }

                            this.setState({ currentInterval: index }, this.__fetchTradeHistory);
                        };

                        return (
                            <TouchableOpacity key={index} onPress={onPress}>
                                <SpanText style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    color: currentInterval === index ? Color.Main : Color.GrayBlues,
                                }}>
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
        if (!this.state.ready) {
            return <ActivityIndicator />;
        }

        const data = this.state.data;
        const contentInset = { top: 10, bottom: 1 };

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id="gradient" x1="0%" y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset="0%" stopColor={Color.Main} stopOpacity={0.8}/>
                    <Stop offset="100%" stopColor={Color.Main} stopOpacity={0.2}/>
                </LinearGradient>
            </Defs>
        );

        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);

        return (
            <AreaChart
                style={{ flex: 1 }}
                data={data}
                contentInset={contentInset}
                curve={shape.curveNatural}
                gridMax={maxValue * 1.1}
                gridMin={minValue * 0.9}
                svg={{ fill: 'url(#gradient)', strokeWidth: 2, stroke: Color.Main }}
            >
                <Gradient />
            </AreaChart>
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
