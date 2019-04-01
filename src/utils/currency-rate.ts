import { KunaAssetUnit, kunaMarketMap, KunaV3Ticker } from 'kuna-sdk';
import Numeral from 'numeral';
import { find } from 'lodash';

export class UsdCalculator {
    protected usdRate: number;
    protected tickers: Record<string, KunaV3Ticker>;

    public constructor(usdRate: number, tickers: Record<string, KunaV3Ticker>) {
        this.usdRate = usdRate || 27.2;
        this.tickers = tickers;
    }

    public getPrice(marketSymbol: string): Numeral {
        const currentMarket = kunaMarketMap[marketSymbol];

        if (!currentMarket) {
            console.warn(marketSymbol);

            return Numeral(0);
        }
        
        const ticker = find(this.tickers, { symbol: marketSymbol }) as KunaV3Ticker || {
            last: 0,
        };

        switch (currentMarket.quoteAsset) {
            case KunaAssetUnit.USDollar:
                return Numeral(ticker.lastPrice || 0);

            case KunaAssetUnit.UkrainianHryvnia:
                if (!this.usdRate) {
                    return Numeral(0);
                }

                return Numeral(ticker.lastPrice || 0).divide(this.usdRate);

            case KunaAssetUnit.Bitcoin:
                const btcTicker = this.tickers['btcuah'];

                return Numeral(ticker.lastPrice || 0)
                    .multiply(btcTicker ? btcTicker.lastPrice : 0)
                    .divide(this.usdRate);


            case KunaAssetUnit.Ethereum:
                const ethTicker = this.tickers['ethuah'];

                return Numeral(ticker.lastPrice || 0)
                    .multiply(ethTicker ? ethTicker.lastPrice : 0)
                    .divide(this.usdRate);


            case KunaAssetUnit.StasisEuro:
                const euroTicker = this.tickers['eursuah'];

                return Numeral(ticker.lastPrice || 0)
                    .multiply(euroTicker ? euroTicker.lastPrice : 0)
                    .divide(this.usdRate);


            case KunaAssetUnit.GolosGold:
                const golosTicker = this.tickers['gbguah'];

                return Numeral(ticker.lastPrice || 0)
                    .multiply(golosTicker ? golosTicker.lastPrice : 0)
                    .divide(this.usdRate);


            case KunaAssetUnit.AdvancedUSD:
            case KunaAssetUnit.TrueUSD:
            case KunaAssetUnit.Tether:
                return Numeral(ticker.lastPrice || 0);


            case KunaAssetUnit.AdvancedRUB:
                const advTicker = this.tickers['uaharub'];

                if (!advTicker) {
                    return Numeral(0);
                }

                return Numeral(ticker.lastPrice || 0)
                    .divide(advTicker.lastPrice)
                    .divide(this.usdRate);
        }

        return Numeral(0);
    }
}
