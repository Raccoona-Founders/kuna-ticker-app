import Axios from 'axios';
import { find } from 'lodash';

const LIQPAY_RATE_URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

type LiqpayRate = {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
};

export async function getUahRate(): Promise<number> {
    const {data} = await Axios.get<LiqpayRate[]>(LIQPAY_RATE_URL);
    const rate = find(data, {ccy: 'USD'});

    if (!rate) {
        console.log('Liqpay return rates without USD');

        return 28;
    }

    return parseFloat(rate.buy) || 0.0;
}