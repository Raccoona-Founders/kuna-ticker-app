import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { map, maxBy, meanBy, max } from 'lodash';
import { KunaMarket } from 'kuna-sdk';
import OrderBookProcessor from 'utils/order-book-processor';
import OrderRow from './order-row';

type SideRowsProps = {
    side: 'ask' | 'bid';
    orderBook: OrderBookProcessor;
    precision?: number;
    market: KunaMarket;
    style?: StyleProp<ViewStyle>;
};

const SideRows = (props: SideRowsProps): JSX.Element => {
    const { orderBook, side, precision = 0.05 } = props;
    const items = (side === 'ask')
        ? orderBook.getAskWithPrecision(precision)
        : orderBook.getBidWithPrecision(precision);

    const avr = meanBy(items, ([price, value]) => +value);
    const maxItem = maxBy(items, ([price, value]) => +value);
    const totalValue = max([orderBook.sumByAsk(), orderBook.sumByBid()]) as number;

    const maxValue = maxItem ? maxItem[1] : 0;
    let cumulativeValue = 0;

    return (
        <View style={props.style}>
            {map(items, ([price, value], index: number) => {
                cumulativeValue += (+value);

                return (
                    <OrderRow key={index}
                              price={price}
                              value={value}
                              cumulativeValue={cumulativeValue}
                              totalValue={totalValue}
                              type={props.side}
                              maxValue={maxValue}
                              avrValue={avr}
                              market={props.market}
                    />
                );
            })}
        </View>
    );
};

export default SideRows;
