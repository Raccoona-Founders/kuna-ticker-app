import { combineReducers, Reducer } from 'redux';
import { tickerReducer, initialTickerStore } from './ticker';

export const kunaApp: Reducer<KunaStore> = combineReducers({
    ticker: tickerReducer,
});

export function getInitialAppStore(): KunaStore {
    return {
        ticker: initialTickerStore
    };
}
