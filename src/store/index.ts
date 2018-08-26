import { createStore, Store } from 'redux';
import { AsyncStorage } from 'react-native';
import { debounce } from 'lodash';

import { kunaApp, getInitialAppStore } from './reducer';

const STORE_KEY = '@KUNA_TICKER::REDUX_STORE';

export const initStore = async (): Promise<Store<KunaStore>> => {
    const value: string | null = await AsyncStorage.getItem(STORE_KEY);
    let store: Store<KunaStore>;

    try {
        if (value) {
            let initialStore: KunaStore = JSON.parse(value as string);
            store = createStore(kunaApp, initialStore);
        } else {
            store = createStore(kunaApp, getInitialAppStore());
        }
    } catch (error) {
        store = createStore(kunaApp, getInitialAppStore());
    }

    const syncStore = debounce(() => {
        let storingValue = JSON.stringify(store.getState());

        AsyncStorage.setItem(STORE_KEY, storingValue);
    }, 300);

    store.subscribe(syncStore);

    return store;
};
