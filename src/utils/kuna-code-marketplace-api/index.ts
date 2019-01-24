import { get } from 'lodash';
import Axios, { AxiosInstance } from 'axios';

export default class KunaCodeMarketplaceAPI {
    protected readonly client: AxiosInstance;

    public constructor(baseURL: string = 'https://us-central1-kuna-ticker-mobile.cloudfunctions.net') {
        this.client = Axios.create({
            baseURL: baseURL,
        });
    }

    public async getAllOffers(): Promise<kunacodes.Offer[]> {
        const { data } = await this.client.get('/getAllOffers');

        return data.offers as kunacodes.Offer[];
    }

    public async addOffer(offer: kunacodes.RawOffer,
                          user: kunacodes.RawUser): Promise<{ id: string; securityToken: string; }> {

        const requestData = {
            amount: get(offer, 'amount', 1000),
            currency: get(offer, 'currency', 'UAH'),
            comment: get(offer, 'comment', undefined),
            side: get(offer, 'side', 'sell'),
            commission: get(offer, 'commission', 0),
            user: {
                id: get(user, 'id'),
                name: get(user, 'name'),
                telegram: get(user, 'telegram'),
            },
        };

        const { data } = await this.client.post('/addOffer', requestData);

        return {
            id: data.id,
            securityToken: data.token,
        };
    }


    public async deleteOffer(offerId: string, securityToken: string): Promise<void> {
        await this.client.delete('/deleteOffer', {
            params: {
                id: offerId,
                token: securityToken,
            },
        });

        return;
    }
}
