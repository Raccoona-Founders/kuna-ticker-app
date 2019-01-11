import { forEach } from 'lodash';
import ModelAsyncStorage from './common/model-async-storage';

import UsdRateModel from './usd-rate-model';
import TickerModel from './ticker-model';
import UserModel from './user-model';

export default async function buildAppStore(): Promise<MobxStore> {
    const usdRateStore = new UsdRateModel();

    const storage: MobxStore = {
        UsdRate: usdRateStore,
        Ticker: new TickerModel(usdRateStore),
        User: new UserModel(),
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
