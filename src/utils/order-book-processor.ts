import { slice, map, maxBy, meanBy, sumBy, head } from 'lodash';
import { KunaV3OrderBook } from 'kuna-sdk';

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

    public getAsk(depth?: number) {
        return slice(this.__orderBook.ask, 0, depth || this.__depth);
    }

    public getFullAsk() {
        return this.__orderBook.ask;
    }

    public sumByAsk(depth?: number): number {
        return sumBy(this.getAsk(depth), ([price, value]) => +value);
    }

    public getBid(depth?: number) {
        return slice(this.__orderBook.bid, 0, depth || this.__depth);
    }

    public getFullBid() {
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
        }
    }
}
