import { action, observable } from 'mobx';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';
import { getUahRate } from 'utils/external';

const USD_RATE_UPDATE_TIMEOUT = 4 * 60 * 60 * 1000;

export default class UsdRateModel extends ModelAsyncStorage implements MobxUsdRate.StoreModel {
    @observable
    public rate: number = 28;

    @observable
    public lastUpdate?: string;

    public getStoreKey(): string {
        return 'KunaTicker@Mobx_UsdRate';
    }

    @action
    public async updateUsdRate(): Promise<number> {
        try {
            this.rate = await getUahRate();
        } catch (e) {
            console.warn(e);
        }

        this.lastUpdate = new Date().toISOString();

        return this.rate;
    }


    public async initialize(): Promise<void> {
        await super.initialize();

        this.__runUsdRateUpdater()
            .then(() => console.log('Updater successfully run'));
    }

    private async __runUsdRateUpdater() {
        const lastUpdateDate = new Date(this.lastUpdate as string);

        const needUpdate
            = !this.lastUpdate
            || lastUpdateDate.getTime() + USD_RATE_UPDATE_TIMEOUT < new Date().getTime();

        if (needUpdate) {
            await this.updateUsdRate();
        }

        setInterval(this.updateUsdRate.bind(this), USD_RATE_UPDATE_TIMEOUT);
    }
}
