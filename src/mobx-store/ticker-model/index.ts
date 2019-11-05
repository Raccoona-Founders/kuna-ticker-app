import { get, forEach, find, size } from 'lodash';
import Numeral from 'numeral';
import { action, computed, observable, runInAction } from 'mobx';
import { KunaV3Ticker, KunaV3ExchangeRate, KunaV3Market } from 'kuna-sdk';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';
import { UsdCalculator } from 'utils/currency-rate';
import kunaClient from 'utils/kuna-api';
import FavoriteModel from './favorite-model';

const TICKER_UPDATE_TIMEOUT = 10 * 60 * 1000;

export default class TickerModel extends ModelAsyncStorage implements mobx.ticker.TickerModel {
    @observable
    public tickers: Record<string, KunaV3Ticker> = {};

    @observable
    public exchangeRates: KunaV3ExchangeRate[] = [];

    @observable
    public favorite: mobx.ticker.FavoriteModel;

    @observable
    public lastUpdate?: string;

    @observable
    public marketList?: Record<string, mobx.ticker.MarketUnit>;

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
        let newExchangeRates: KunaV3ExchangeRate[] = [];

        try {
            const tickers = await kunaClient.getTickers();
            forEach(tickers, (ticker: KunaV3Ticker) => newTickers[ticker.symbol] = ticker);
        } catch (e) {
        }

        try {
            newExchangeRates = await kunaClient.getExchangeRates();
        } catch (e) {
        }

        runInAction(() => {
            if (size(newTickers) > 0) {
                this.tickers = newTickers;
                this.lastUpdate = new Date().toISOString();
            }

            if (newExchangeRates.length > 0) {
                this.exchangeRates = newExchangeRates;
            }
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

        forEach(this.tickers, (ticker: KunaV3Ticker) => {
            const price = calculator.getPrice(ticker.symbol).value();
            const amount = price * ticker.volume;

            if (amount !== null && amount > 0) {
                sum += amount;
            }
        });

        return Numeral(sum);
    }

    @action
    public async fetchMarketList(): Promise<void> {
        const markets = await kunaClient.getMarkets();

        const marketListObj = this.marketList || {};
        markets.forEach((m: KunaV3Market) => {
            marketListObj[m.id] = {
                key: m.id,
                baseAsset: m.base_unit,
                quoteAsset: m.quote_unit,
                precision: m.quote_precision,
            };
        });

        runInAction(() => {
            this.marketList = marketListObj;
        });
    }

    @computed
    public get usdCalculator(): UsdCalculator {
        return new UsdCalculator(
            this.__usdRateStore.rate,
            this.tickers,
            this.exchangeRates,
        );
    }


    @action
    public async initialize(): Promise<void> {
        await super.initialize();

        this.fetchMarketList();
        this.__runUpdater()
            .then(() => console.log('Ticker updater successfully run'));
    }


    protected _toJSON(): Object {
        return {
            tickers: this.tickers,
            exchangeRates: this.exchangeRates,
            lastUpdate: this.lastUpdate,
            favorite: this.favorite.getList(),
        };
    }


    @action
    protected _fromJSON(object: Object) {
        this.tickers = get(object, 'tickers', {});
        this.exchangeRates = get(object, 'exchangeRates', []);
        this.lastUpdate = get(object, 'lastUpdate', undefined);

        this.favorite.setList(
            get(object, 'favorite', undefined),
        );
    }


    @action
    private async __runUpdater() {
        await this.fetchTickers();

        setInterval(this.fetchTickers, TICKER_UPDATE_TIMEOUT);
    }
}
