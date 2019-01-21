import { orderBy } from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import ModelAsyncStorage from '../common/model-async-storage';
import KunaCodeMarketplaceAPI from 'utils/kuna-code-marketplace-api';

const TIME_TIMEOUT = 60 * 60 * 1000;

export default class KunaCodeModel extends ModelAsyncStorage implements mobx.kunacode.StoreModel {
    @observable
    public offers: kunacodes.Offer[] = [];

    @observable
    public myOffer: mobx.kunacode.UserOffer[] = [];

    @observable
    public lastUpdate?: string;

    protected _user: mobx.user.StoreModel;
    protected _client: KunaCodeMarketplaceAPI;

    public constructor(user: mobx.user.StoreModel) {
        super();

        this._user = user;
        this._client = new KunaCodeMarketplaceAPI();
    }


    @action
    public static create(user: mobx.user.StoreModel): KunaCodeModel {
        return new KunaCodeModel(user);
    }


    @action
    public async fetchOffers(): Promise<kunacodes.Offer[]> {
        const offers = await this._client.getAllOffers();

        runInAction(() => {
            this.offers = offers || [];
            this.lastUpdate = new Date().toISOString();
        });

        return this.offers;
    }


    @action
    public async createOffer(offer: kunacodes.RawOffer): Promise<string> {
        const rawUser: kunacodes.RawUser = {
            id: this._user.userId || '',
            name: this._user.displayName || '',
            telegram: this._user.telegram || '',
        };

        const response = await this._client.addOffer(offer, rawUser);

        runInAction(() => {
            this.myOffer.push({
                offerId: response.id,
                securityToken: response.securityToken,
            });
        });

        await this.fetchOffers();

        return response.id;
    }


    @action
    public async deleteOffer(id: string): Promise<void> {

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

        const isNeedFetchOffers
            = !this.lastUpdate
            || new Date(this.lastUpdate).getTime() + TIME_TIMEOUT < new Date().getTime();

        if (isNeedFetchOffers) {
            this.fetchOffers();
        }
    }


    public isMyOffer(): boolean {
        return false;
    }


    protected _toJS(): Object {
        return {
            offers: this.offers,
            myOffers: this.myOffer,
            lastUpdate: this.lastUpdate,
        };
    }


    public getStoreKey(): string {
        return "KunaTicker@Mobx_KunaCode";
    }
}
