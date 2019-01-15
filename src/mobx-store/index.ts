import { forEach } from 'lodash';
import { configure } from 'mobx';
import ModelAsyncStorage from './common/model-async-storage';

import UsdRateModel from './usd-rate-model';
import TickerModel from './ticker-model';
import UserModel from './user-model';
import KunaCodeModel from './kuna-code-model';

configure({ enforceActions: 'observed' });

export default async function buildAppStore(): Promise<mobx.Store> {
    const usdRateStore = UsdRateModel.create();
    const userModel = UserModel.create();

    const storage: mobx.Store = {
        UsdRate: usdRateStore,
        User: userModel,
        Ticker: TickerModel.create(usdRateStore),
        KunaCode: KunaCodeModel.create(userModel),
    };

    const awaitInitializations: Array<PromiseLike<any>> = [];

    forEach(storage, (item: Object) => {
        if (item instanceof ModelAsyncStorage) {
            awaitInitializations.push(item.initialize());
        }
    });

    await Promise.all(awaitInitializations);

    return storage;
}
