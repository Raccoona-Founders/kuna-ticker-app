import moment from 'moment';
import { KunaApiV3Client } from 'kuna-sdk';
import Axios from 'axios';

type KunaTradeHistory = {
    t: number[];
    h: number[];
    l: number[];
    o: number[];
    c: number[];
    v: number[];
    s: string | 'ok';
};

/**
 * https://kuna.io/api/v2/trades_history?market=btcuah&resolution=60&from=1543848174&to=1549032234
 */
export async function fetchKunaTradeHistory(market: string,
                                            resolution: string | number = 60,
                                            days: number = 1): Promise<KunaTradeHistory> {
    const to = moment();
    const from = to.clone().subtract(days, 'days');

    const { data } = await Axios.get('https://kuna.io/api/v2/trades_history', {
        params: {
            market: market,
            resolution: resolution,
            from: from.unix(),
            to: to.unix(),
        },
    });

    return data;
}


const kunaClient = new KunaApiV3Client();

export default kunaClient;
