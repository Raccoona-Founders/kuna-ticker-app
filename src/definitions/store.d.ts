import { KunaTicker } from 'kuna-sdk';

declare global {
    type KunaStore = {
        ticker: StoreTicker;
    };

    type StoreTicker = {
        updating: boolean;
        tickers: Record<string, KunaTicker>;
    };
}

export {};
