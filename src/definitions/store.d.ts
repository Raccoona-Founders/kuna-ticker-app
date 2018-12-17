import { KunaV3Ticker } from 'kuna-sdk';

declare global {
    type KunaStore = {
        ticker: StoreTicker;
    };

    type StoreTicker = {
        updating: boolean;
        tickers: Record<string, KunaV3Ticker>;
        usdRate: number;
    };
}

export {};
