import moment from 'moment';
import kunaClient from './kuna-api';

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

    return await kunaClient.chart().history(market, resolution, from.unix(), to.unix());
}
