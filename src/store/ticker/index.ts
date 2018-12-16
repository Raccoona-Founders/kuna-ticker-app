import { forEach } from 'lodash';
import { AnyAction } from 'redux';
import { KunaV3Ticker } from 'kuna-sdk';
import { Ticker } from 'store/actions';

export const initialTickerStore: StoreTicker = {
    updating: false,
    tickers: {},
    usdRate: 28,
};

export const tickerReducer = (tickerStore: StoreTicker = initialTickerStore, action: AnyAction): StoreTicker => {
    switch (action.type) {
        case Ticker.UpdateTicker: {
            return {
                ...tickerStore,
                tickers: {
                    ...tickerStore.tickers,
                    [action.marketSymbol]: action.ticker,
                },
            };
        }

        case Ticker.BulkUpdateTickers: {
            const newTickers: Record<string, KunaV3Ticker> = {};

            forEach(action.tickers, (ticker: KunaV3Ticker) => {
                newTickers[ticker.symbol] = ticker;
            });

            return {
                ...tickerStore,
                tickers: {
                    ...tickerStore.tickers,
                    ...newTickers,
                },
            };
        }

        case Ticker.UpdateUSDRate: {
            return {
                ...tickerStore,
                usdRate: action.rate,
            }
        }
    }

    return tickerStore;
};
