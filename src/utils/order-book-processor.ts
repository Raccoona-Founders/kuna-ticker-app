import BigNumber from 'bignumber.js';
import { slice, orderBy, sumBy, head, groupBy, reduce } from 'lodash';
import { KunaV3Order, KunaV3OrderBook } from 'kuna-sdk';

export type Spread = {
    value: number;
    percentage: number;
};

export default class OrderBookProcessor {
    private __orderBook: KunaV3OrderBook;
    private __depth: number;

    public constructor(book: KunaV3OrderBook, depth: number = 50) {
        this.__orderBook = book;
        this.__depth = depth;
    }

    public setDepth(depth: number) {
        this.__depth = depth;
    }

    public getAsk(depth?: number): KunaV3Order[] {
        return slice(this.__orderBook.ask, 0, depth || this.__depth);
    }

    public getFullAsk(): KunaV3Order[] {
        return this.__orderBook.ask;
    }

    public sumByAsk(depth?: number): number {
        return sumBy(this.getAsk(depth), ([price, value]) => +value);
    }

    public getBid(depth?: number): KunaV3Order[] {
        return slice(this.__orderBook.bid, 0, depth || this.__depth);
    }

    public getFullBid(): KunaV3Order[] {
        return this.__orderBook.bid;
    }

    public sumByBid(depth?: number): number {
        return sumBy(this.getBid(depth), ([price, value]) => +value);
    }

    public getSpread(): Spread {
        const headBid = head(this.__orderBook.bid);
        const headAsk = head(this.__orderBook.ask);

        if (!headBid || !headAsk) {
            return {
                value: 0,
                percentage: 0,
            };
        }

        const spreadValue = headAsk[0] - headBid[0];
        const middlePrice = (headAsk[0] + headBid[0]) / 2;

        return {
            value: spreadValue,
            percentage: (spreadValue / middlePrice) * 100,
        };
    }

    public getAskWithPrecision(precision: number): KunaV3Order[] {
        return slice(
            OrderBookProcessor.getPrecision(this.getAsk(100), precision, 'ask'),
            0,
            this.__depth,
        );
    }

    public getBidWithPrecision(precision: number): KunaV3Order[] {
        return slice(
            OrderBookProcessor.getPrecision(this.getBid(100), precision, 'bid'),
            0,
            this.__depth,
        );
    }

    public static getPrecision(orders: KunaV3Order[], prec: number, side: string): KunaV3Order[] {
        if (prec <= 0) {
            return orders;
        }

        const roundingMode = BigNumber.ROUND_UP;

        const grouped = groupBy(orders, (current: KunaV3Order) => (
            new BigNumber(current[0])
                .div(prec)
                .decimalPlaces(0, roundingMode)
                .times(prec)
                .toFixed(8)
        ));

        const reducedData = reduce(grouped, (total: KunaV3Order[], current: KunaV3Order[]) => {
            const price = new BigNumber(current[0][0])
                .div(prec)
                .decimalPlaces(0, roundingMode)
                .times(prec)
                .toNumber();

            let totalVolume = 0;
            let totalCount = 0;

            current.forEach((order: KunaV3Order) => {
                totalVolume += order[1];
                totalCount += order[2];
            });

            total.push([price, totalVolume, totalCount]);

            return total;
        }, [] as KunaV3Order[]);

        return orderBy(
            reducedData,
            order => order[0],
            side === 'ask' ? 'asc' : 'desc',
        );
    }
}
