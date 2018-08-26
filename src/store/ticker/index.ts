import { Ticker } from 'store/actions';
import { AnyAction } from 'redux';

export const initialTickerStore: StoreTicker = {
    updating: false,
    tickers: {},
};

export const tickerReducer = (tickerStore: StoreTicker = initialTickerStore, action: AnyAction): StoreTicker => {
    switch (action.type) {
        case Ticker.UpdateTicker: {
            return {
                ...tickerStore,
                tickers: {
                    ...tickerStore.tickers,
                    [action.marketSymbol]: action.ticker
                }
            };
        }
    }

    return tickerStore;
};
