import { forEach } from 'lodash';
import { configure } from 'mobx';
import ModelAsyncStorage from './common/model-async-storage';

import UsdRateModel from './usd-rate-model';
import TickerModel from './ticker-model';
import UserModel from './user-model';

configure({ enforceActions: 'observed' });

export default async function buildAppStore(): Promise<MobxStore> {
    const usdRateStore = UsdRateModel.create();

    const storage: MobxStore = {
        UsdRate: usdRateStore,
        Ticker: TickerModel.create(usdRateStore),
        User: UserModel.create(),
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
