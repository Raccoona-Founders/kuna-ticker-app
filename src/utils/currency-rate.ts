import { kunaMarketMap, KunaV3ExchangeRate, KunaV3Ticker } from 'kuna-sdk';
import Numeral from 'numeral';
import { find } from 'lodash';

type RateToken = 'usd' | 'btc' | 'uah';

export class UsdCalculator {
    protected usdRate: number;
    protected tickers: Record<string, KunaV3Ticker>;
    protected exchangeRates: KunaV3ExchangeRate[];

    public constructor(usdRate: number, tickers: Record<string, KunaV3Ticker>, exchangeRates: KunaV3ExchangeRate[]) {
        this.usdRate = usdRate || 27.2;
        this.tickers = tickers;
        this.exchangeRates = exchangeRates;
    }

    public getPrice(marketSymbol: string, toPrice: RateToken = 'usd'): Numeral {
        const currentMarket = kunaMarketMap[marketSymbol];

        if (!currentMarket) {
            return Numeral(0);
        }

        const ticker = find(this.tickers, { symbol: marketSymbol });
        if (!ticker) {
            return Numeral(0);
        }

        const exchangeRate = find(this.exchangeRates, { currency: currentMarket.quoteAsset.toLowerCase() });
        if (!exchangeRate) {
            return Numeral(0);
        }

        return Numeral(ticker.lastPrice).multiply(exchangeRate[toPrice]);
    }
}
