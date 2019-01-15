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
}
