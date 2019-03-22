import { orderBy, find, map } from 'lodash';
import Axios from 'axios';
import { action, computed, observable, runInAction } from 'mobx';
import KunaCodeMarketplaceAPI from 'utils/kuna-code-marketplace-api';
import ModelAsyncStorage from '../common/model-async-storage';
import Helper from './helper';

const TIME_TIMEOUT = 60 * 60 * 1000;

export default class KunaCodeModel extends ModelAsyncStorage implements mobx.kunacode.StoreModel {
    @observable
    public offers: kunacodes.Offer[] = [];

    @observable
    public telegramOffers: mobx.kunacode.TelegramOffer[] = [];

    @observable
    public myOffers: mobx.kunacode.UserOffer[] = [];

    @observable
    public lastUpdate?: string;

    protected _user: mobx.user.UserModel;
    protected _client: KunaCodeMarketplaceAPI;

    public constructor(user: mobx.user.UserModel) {
        super();

        this._user = user;
        this._client = new KunaCodeMarketplaceAPI();
    }


    @action
    public static create(user: mobx.user.UserModel): KunaCodeModel {
        return new KunaCodeModel(user);
    }


    @action.bound
    public async fetchOffers(): Promise<kunacodes.Offer[]> {
        const offers = await this._client.getAllOffers();

        runInAction(() => {
            this.offers = offers || [];
            this.lastUpdate = new Date().toISOString();
        });

        return this.offers;
    }

    @action.bound
    public async fetchTelegramOffers(): Promise<mobx.kunacode.TelegramOffer[]> {
        const { data } = await Axios.get('http://kunacode.parsing.run/orders.json');
        if (false === Array.isArray(data)) {
            throw new Error('Invalid data');
        }

        const offers = map(data, (of) => {

            const [id, token, sum, partial, price, percent, bankName, currency, description] = of;

            return {
                id,
                token,
                sum,
                price,
                percent,
                bankName,
                description,
                currency,
                partial: partial === '-' ? undefined : partial,
                bank: Helper.checkBank(of[6]),
            };
        });

        runInAction(() => {
            this.telegramOffers = offers;
        });

        return offers;
    }


    @action
    public async createOffer(offer: kunacodes.RawOffer): Promise<string> {
        const rawUser: kunacodes.RawUser = {
            id: this._user.userId || '',
            name: this._user.displayName || '',
            telegram: '@' + this._user.telegram || '',
        };

        const response = await this._client.addOffer(offer, rawUser);

        runInAction(() => {
            this.myOffers.push({
                offerId: response.id,
                securityToken: response.securityToken,
            });
        });

        await this.fetchOffers();

        return response.id;
    }


    public checkUserReady(): void {
        if (!this._user.displayName) {
            throw new Error('Please setup your name');
        }

        if (!this._user.telegram) {
            throw new Error('Please setup your Telegram');
        }
    }


    @action
    public async deleteOffer(offerId: string): Promise<void> {
        const myOffer = find(this.myOffers, { offerId: offerId });

        if (!myOffer) {
            return;
        }

        await this._client.deleteOffer(myOffer.offerId, myOffer.securityToken);
        await this.fetchOffers();
    }


    @computed
    public get sortedOffers(): kunacodes.Offer[] {
        return orderBy(this.offers, [
            (offer: kunacodes.Offer) => offer.creation_time ? new Date(offer.creation_time).getTime() : 0,
        ], ['desc']);
    }


    @action
    public async initialize(): Promise<void> {
        await super.initialize();

        this.fetchTelegramOffers().catch((error) => {
            console.log(error.message);
            console.log(error);
        });
    }


    public isMyOffer(offerId: string): boolean {
        const offer = find(this.myOffers, { offerId: offerId });

        return !!offer;
    }


    protected _toJSON(): Object {
        return {
            offers: this.offers,
            myOffers: this.myOffers,
            lastUpdate: this.lastUpdate,
        };
    }


    public getStoreKey(): string {
        return "KunaTicker@Mobx_KunaCode";
    }
}
