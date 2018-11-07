import { KunaAssetUnit, kunaMarketMap, KunaTicker } from 'kuna-sdk';
import Numeral from 'numeral';
import { find } from 'lodash';

export class UsdCalculator {
    protected usdRate: number;
    protected tickers: Record<string, KunaTicker>;

    public constructor(usdRate: number, tickers: Record<string, KunaTicker>) {
        this.usdRate = usdRate || 28;
        this.tickers = tickers;
    }

    public getPrice(marketSymbol: string): Numeral {
        const currentMarket = kunaMarketMap[marketSymbol];
        const ticker = find(this.tickers, { market: marketSymbol }) as KunaTicker || {
            last: 0
        };

        switch (currentMarket.quoteAsset) {
            case KunaAssetUnit.UkrainianHryvnia:
                return Numeral(ticker.last).divide(this.usdRate);

            case KunaAssetUnit.Bitcoin:
                const btcTicker = this.tickers['btcuah'];

                return Numeral(ticker.last).multiply(btcTicker ? btcTicker.last : 0).divide(this.usdRate);

            case KunaAssetUnit.Ethereum:
                const ethTicker = this.tickers['ethuah'];

                return Numeral(ticker.last).multiply(ethTicker ? ethTicker.last : 0).divide(this.usdRate);

            case KunaAssetUnit.StasisEuro:
                const euroTicker = this.tickers['eursuah'];

                return Numeral(ticker.last).multiply(euroTicker ? euroTicker.last : 0).divide(this.usdRate);

            case KunaAssetUnit.GolosGold:
                const golosTicker = this.tickers['gbguah'];

                return Numeral(ticker.last).multiply(golosTicker ? golosTicker.last : 0).divide(this.usdRate);
        }

        return Numeral(0);
    }
}
