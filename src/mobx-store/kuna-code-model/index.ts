import { action, observable } from 'mobx';
import ModelAsyncStorage from '../common/model-async-storage';


export default class KunaCodeModel extends ModelAsyncStorage implements MobxKunaCode.StoreModel {
    @observable
    public myOffer: MobxKunaCode.UserOffer[] = [];

    @observable
    public offers: MobxKunaCode.Offer[] = [];

    protected _user: MobxUser.StoreModel;

    public constructor(user: MobxUser.StoreModel) {
        super();

        this._user = user;
    }

    @action
    public static create(user: MobxUser.StoreModel): KunaCodeModel {
        return new KunaCodeModel(user);
    }

    @action
    public async fetchOffers(): Promise<MobxKunaCode.Offer[]> {
        this.offers = [];

        return this.offers;
    }


    protected _toJS(): Object {
        return {
            offers: this.offers,
            myOffers: this.myOffer,
        };
    }


    public getStoreKey(): string {
        return "KunaTicker@Mobx_KunaCode";
    }
}
