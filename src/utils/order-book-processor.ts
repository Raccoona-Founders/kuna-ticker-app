import BigNumber from 'bignumber.js';
import { slice, orderBy, sumBy, head, groupBy, reduce, filter } from 'lodash';
import { KunaV3Order, KunaV3OrderBook } from 'kuna-sdk';

export type Spread = {
    middlePrice: number;
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
                middlePrice: 0,
                value: 0,
                percentage: 0,
            };
        }

        const spreadValue = headAsk[0] - headBid[0];
        const middlePrice = (headAsk[0] + headBid[0]) / 2;

        return {
            middlePrice: middlePrice,
            value: spreadValue,
            percentage: (spreadValue / middlePrice) * 100,
        };
    }

    public calculatePriceDepth(side: 'ask' | 'bid', percent: number): number[] {
        const result = [0, 0];

        if (percent <= 0) {
            return result;
        }

        if (percent >= 1) {
            percent = 1;
        }

        const isAsk = side === 'ask';

        const middlePrice = this.getSpread().middlePrice;

        let elements = [];
        if (isAsk) {
            const borderPrice = middlePrice * (1 + percent);
            elements = filter(this.getFullAsk(), v => v[0] <= borderPrice);
        } else {
            const borderPrice = middlePrice * (1 - percent);
            elements = filter(this.getFullBid(), v => v[0] >= borderPrice);
        }

        elements.forEach(v => {
            result[0] += v[1];
            result[1] += v[1] * v[0];
        });

        return result;
    }


    public convertToPrecision(precision: number): OrderBookProcessor {
        return new OrderBookProcessor({
            ask: OrderBookProcessor.getPrecision(this.getFullAsk(), precision, 'ask'),
            bid: OrderBookProcessor.getPrecision(this.getFullBid(), precision, 'bid'),
        }, this.__depth);
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


    public calculateAmountBase(value: number, book: KunaV3Order[]): any {
        let orderCounter = 0;

        let baseValue = new BigNumber(0);
        let quoteValue = new BigNumber(0);
        let nValue = new BigNumber(value);

        for (let [p, v] of book) {
            let orderSize = p * v;
            if (nValue.minus(baseValue).isLessThan(v)) {
                const leaveValue = nValue.minus(baseValue);
                baseValue = baseValue.plus(leaveValue);
                quoteValue = quoteValue.plus(leaveValue.times(p));
            } else {
                baseValue = baseValue.plus(v);
                quoteValue = quoteValue.plus(orderSize);
            }

            orderCounter++;

            if (baseValue.isGreaterThanOrEqualTo(value)) {
                break;
            }
        }

        return {
            values: [baseValue.toNumber(), quoteValue.toNumber()],
            orderCounter: orderCounter,
        };
    }


    public calculateAmountQuote(value: number, book: KunaV3Order[]): any {
        let orderCounter = 0;

        let baseValue = new BigNumber(0);
        let quoteValue = new BigNumber(0);
        let nValue = new BigNumber(value);

        for (let [p, v] of book) {
            let orderSize = p * v;
            if (nValue.minus(quoteValue).isLessThan(orderSize)) {
                const leaveValue = nValue.minus(quoteValue);
                baseValue = baseValue.plus(leaveValue.div(p));
                quoteValue = quoteValue.plus(leaveValue);
            } else {
                baseValue = baseValue.plus(v);
                quoteValue = quoteValue.plus(orderSize);
            }

            orderCounter++;

            if (quoteValue.isGreaterThanOrEqualTo(value)) {
                break;
            }
        }

        return {
            values: [baseValue.toNumber(), quoteValue.toNumber()],
            orderCounter: orderCounter,
        };
    }
}
