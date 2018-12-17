import { slice, map, maxBy, meanBy, sumBy } from 'lodash';
import { KunaV3OrderBook } from 'kuna-sdk';

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

    public getBid(depth?: number) {
        return slice(this.__orderBook.bid, 0, depth || this.__depth);
    }

    public getFullBid() {
        return this.__orderBook.bid;
    }
}
