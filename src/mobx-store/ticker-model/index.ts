import { forEach, find } from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import { KunaV3Ticker } from 'kuna-sdk';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';
import { UsdCalculator } from 'utils/currency-rate';
import kunaClient from 'utils/kuna-api';

const TICKER_UPDATE_TIMEOUT = 10 * 60 * 1000;

export default class TickerModel extends ModelAsyncStorage implements mobx.ticker.StoreModel {

    @observable
    public tickers: Record<string, KunaV3Ticker> = {};

    @observable
    public lastUpdate?: string;

    private __usdRateStore: mobx.usdrate.StoreModel;

    @action
    public static create(usdRateStore: mobx.usdrate.StoreModel): TickerModel {
        return new TickerModel(usdRateStore);
    }

    public constructor(usdRateStore: mobx.usdrate.StoreModel) {
        super();

        this.__usdRateStore = usdRateStore;
    }

    public getStoreKey(): string {
        return 'KunaTicker@Mobx_Ticker';
    }


    @action.bound
    public fetchTickers = async (): Promise<void> => {
        const newTickers: Record<string, KunaV3Ticker> = {};

        try {
            const tickers = await kunaClient.getTickers();
            forEach(tickers, (ticker: KunaV3Ticker) => newTickers[ticker.symbol] = ticker);
        } catch (e) {

        }

        runInAction(() => {
            this.tickers = {
                ...this.tickers,
                ...newTickers,
            };
            this.lastUpdate = new Date().toISOString();
        });
    };


    public getTicker(marketSymbol: string): KunaV3Ticker | undefined {
        return find(this.tickers, {symbol: marketSymbol});
    }


    @computed
    public get usdCalculator(): UsdCalculator {
        return new UsdCalculator(this.__usdRateStore.rate, this.tickers);
    }


    @action
    public async initialize(): Promise<void> {
        await super.initialize();

        this.__runUpdater()
            .then(() => console.log('Ticker updater successfully run'));
    }


    protected _toJS(): Object {
        return {
            tickers: this.tickers,
            lastUpdate: this.lastUpdate,
        };
    }

    @action
    private async __runUpdater() {
        const lastUpdateDate = new Date(this.lastUpdate as string);

        const needUpdate
            = !this.lastUpdate
            || lastUpdateDate.getTime() + TICKER_UPDATE_TIMEOUT < new Date().getTime();

        if (needUpdate) {
            await this.fetchTickers();
        }

        setInterval(this.fetchTickers, TICKER_UPDATE_TIMEOUT);
    }
}
