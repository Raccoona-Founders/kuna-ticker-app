import { forEach, find } from 'lodash';
import { action, computed, observable } from 'mobx';
import { KunaV3Ticker } from 'kuna-sdk';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';
import { UsdCalculator } from 'utils/currency-rate';
import kunaClient from 'utils/kuna-api';

const TICKER_UPDATE_TIMEOUT = 10 * 60 * 1000;

export default class TickerModel extends ModelAsyncStorage implements MobxTicker.StoreModel {

    @observable
    public tickers: Record<string, KunaV3Ticker> = {};

    @observable
    public lastUpdate?: string;

    private __usdRateStore: MobxUsdRate.StoreModel;

    public constructor(usdRateStore: MobxUsdRate.StoreModel) {
        super();

        this.__usdRateStore = usdRateStore;
    }

    public getStoreKey(): string {
        return 'KunaTicker@Mobx_Ticker';
    }


    @action
    public async fetchTickers(): Promise<void> {
        try {
            const tickers = await kunaClient.getTickers();

            const newTickers: Record<string, KunaV3Ticker> = {};
            forEach(tickers, (ticker: KunaV3Ticker) => newTickers[ticker.symbol] = ticker);

            this.tickers = {
                ...this.tickers,
                ...newTickers,
            };
        } catch (e) {

        }

        this.lastUpdate = new Date().toISOString();
    }


    public getTicker(marketSymbol: string): KunaV3Ticker | undefined {
        return find(this.tickers, { symbol: marketSymbol });
    }


    @computed
    public get usdCalculator(): UsdCalculator {
        return new UsdCalculator(this.__usdRateStore.rate, this.tickers);
    }


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


    private async __runUpdater() {
        const lastUpdateDate = new Date(this.lastUpdate as string);

        const needUpdate
            = !this.lastUpdate
            || lastUpdateDate.getTime() + TICKER_UPDATE_TIMEOUT < new Date().getTime();

        if (needUpdate) {
            await this.fetchTickers();
        }

        setInterval(this.fetchTickers.bind(this), TICKER_UPDATE_TIMEOUT);
    }
}
