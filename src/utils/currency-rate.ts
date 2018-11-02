import { KunaAssetUnit, kunaMarketMap, KunaTicker } from 'kuna-sdk';
import Numeral from 'numeral';
import { find } from 'lodash';

export class UsdCalculator {
    protected usdRate: number;
    protected tickers: Record<string, KunaTicker>;

    public constructor(usdRate: number, tickers: Record<string, KunaTicker>) {
        this.usdRate = usdRate;
        this.tickers = tickers;
    }

    public getPrice(marketSymbol: string): Numeral {
        const currentMarket = kunaMarketMap[marketSymbol];
        const ticker = find(this.tickers, { market: marketSymbol }) as KunaTicker;

        switch (currentMarket.quoteAsset) {
            case KunaAssetUnit.UkrainianHryvnia:
                return Numeral(ticker.last).divide(this.usdRate);

            case KunaAssetUnit.Bitcoin:
                let btcTicker = this.tickers['btcuah'];

                return Numeral(ticker.last).multiply(btcTicker ? btcTicker.last : 0).divide(this.usdRate);
        }

        return Numeral(0);
    }
}
