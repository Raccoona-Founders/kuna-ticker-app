import { Dictionary } from 'lodash';
import { KunaAssetUnit } from './asset';

export type KunaPair = {
    key: string;
    baseCurrency: KunaAssetUnit | string;
    quoteCurrency: KunaAssetUnit | string;
    format: string;
    compareTo?: string;
};

export const kunaPairMap: Dictionary<KunaPair> = {
    btcuah: {
        key: 'btcuah',
        baseCurrency: KunaAssetUnit.Bitcoin,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'btcusd',
    },
    ethuah: {
        key: 'ethuah',
        baseCurrency: 'ETH',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'ethusd',
    },
    dashuah: {
        key: 'dashuah',
        baseCurrency: KunaAssetUnit.Dash,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'dshusd',
    },
    xrpuah: {
        key: 'xrpuah',
        baseCurrency: KunaAssetUnit.Ripple,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'xrpusd',
    },
    ltcuah: {
        key: 'ltcuah',
        baseCurrency: KunaAssetUnit.Litecoin,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'ltcusd',
    },
    eosuah: {
        key: 'eosuah',
        baseCurrency: KunaAssetUnit.EOS,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
        compareTo: 'eosusd',
    },
    krbuah: {
        key: 'krbuah',
        baseCurrency: KunaAssetUnit.Karbo,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    xemuah: {
        key: 'xemuah',
        baseCurrency: KunaAssetUnit.Nem,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    remuah: {
        key: 'remuah',
        baseCurrency: KunaAssetUnit.Remme,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    wavesuah: {
        key: 'wavesuah',
        baseCurrency: 'WAVES',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    zecuah: {
        key: 'zecuah',
        baseCurrency: 'ZEC',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    bchuah: {
        key: 'bchuah',
        baseCurrency: 'BCH',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    gbguah: {
        key: 'gbguah',
        baseCurrency: 'GBG',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },

    // to Bitcoin
    kunbtc: {
        key: 'kunbtc',
        baseCurrency: KunaAssetUnit.KunaToken,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    bchbtc: {
        key: 'bchbtc',
        baseCurrency: KunaAssetUnit.BitcoinCash,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    rmcbtc: {
        key: 'rmcbtc',
        baseCurrency: KunaAssetUnit.RussianMinerCoin,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    rbtc: {
        key: 'rbtc',
        baseCurrency: 'R',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    arnbtc: {
        key: 'arnbtc',
        baseCurrency: 'ARN',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    evrbtc: {
        key: 'evrbtc',
        baseCurrency: 'EVR',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    foodbtc: {
        key: 'foodbtc',
        baseCurrency: 'FOOD',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    erc20btc: {
        key: 'erc20btc',
        baseCurrency: 'ERC20',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[00000]',
    },
    hknbtc: {
        key: 'hknbtc',
        baseCurrency: 'HKN',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    venusbtc: {
        key: 'venusbtc',
        baseCurrency: 'VENUS',
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    xlmuah: {
        key: 'xlmuah',
        baseCurrency: 'XLM',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[000000]',
    },
    tusduah: {
        key: 'tusduah',
        baseCurrency: 'TUSD',
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[000000]',
    },

    // to Golos Gold
    golgbg: {
        key: 'golgbg',
        baseCurrency: 'GOL',
        quoteCurrency: 'GBG',
        format: '0,0.[0000]',
    },

    // to Ethereum
    remeth: {
        key: 'remeth',
        baseCurrency: 'REM',
        quoteCurrency: 'ETH',
        format: '0,0.[00000000]',
    },
};
