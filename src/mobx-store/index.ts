import { forEach } from 'lodash';
import { configure } from 'mobx';
import ModelAsyncStorage from './common/model-async-storage';

import UsdRateModel from './usd-rate-model';
import UserModel from './user-model';
import TickerModel from './ticker-model';
import KunaCodeModel from './kuna-code-model';

configure({ enforceActions: 'observed' });

export default async function buildAppStore(): Promise<mobx.Store> {
    const storage: mobx.Store = {} as mobx.Store;

    storage.UsdRate = UsdRateModel.create();
    storage.User = UserModel.create();
    storage.Ticker = TickerModel.create(storage.UsdRate);
    storage.KunaCode = KunaCodeModel.create(storage.User);

    const awaitInitializations: Array<PromiseLike<any>> = [];

    forEach(storage, (item: Object) => {
        if (item instanceof ModelAsyncStorage) {
            awaitInitializations.push(item.initialize());
        }
    });

    await Promise.all(awaitInitializations);

    return storage;
}
