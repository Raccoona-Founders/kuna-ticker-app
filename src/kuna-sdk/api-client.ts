import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { KunaTicker } from './ticker';

export class KunaApiClient {
    private axiosClient: AxiosInstance;

    public constructor() {
        this.axiosClient = Axios.create({
            baseURL: 'https://kuna.io/api/v2',
        });
    }

    public async extractTicker(tickerKey: string): Promise<KunaTicker> {
        const { data }: AxiosResponse = await this.axiosClient.get(`/tickers/${tickerKey}`);

        return data.ticker;
    }

    public async extractTickers(): Promise<KunaTicker[]> {
        const response: AxiosResponse = await this.axiosClient.get(`/tickers`);

        return response.data;
    }
}
