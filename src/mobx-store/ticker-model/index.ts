import { get, forEach, find } from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import { KunaV3Ticker } from 'kuna-sdk';
import Numeral from 'numeral';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';
import { UsdCalculator } from 'utils/currency-rate';
import kunaClient from 'utils/kuna-api';
import FavoriteModel from './favorite-model';

const TICKER_UPDATE_TIMEOUT = 10 * 60 * 1000;

export default class TickerModel extends ModelAsyncStorage implements mobx.ticker.TickerModel {
    @observable
    public tickers: Record<string, KunaV3Ticker> = {};

    @observable
    public favorite: mobx.ticker.FavoriteModel;

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
        this.favorite = new FavoriteModel();
    }


    public getStoreKey(): string {
        return 'KunaTicker@Mobx_Ticker';
    }


    @action
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


    public getFavorite(): KunaV3Ticker[] {
        const list = this.favorite.getList();

        const tickers: KunaV3Ticker[] = [];

        forEach(this.tickers, (ticker: KunaV3Ticker) => {
            if (list.indexOf(ticker.symbol) >= 0) {
                tickers.push(ticker);
            }
        });

        return tickers;
    }


    public getTicker(marketSymbol: string): KunaV3Ticker | undefined {
        return find(this.tickers, { symbol: marketSymbol });
    }


    public getMarketVolume(): Numeral {
        let sum = 0;
        const calculator = this.usdCalculator;

        forEach(this.tickers, (ticker: KunaV3Ticker, market: string) => {
            sum += calculator.getPrice(market).multiply(ticker.volume).value();
        });

        return Numeral(sum);
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


    protected _toJSON(): Object {
        return {
            tickers: this.tickers,
            lastUpdate: this.lastUpdate,
            favorite: this.favorite.getList(),
        };
    }


    @action
    protected _fromJSON(object: Object) {
        this.tickers = get(object, 'tickers', {});
        this.lastUpdate = get(object, 'lastUpdate', undefined);

        this.favorite.setList(
            get(object, 'favorite', []),
        );
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
