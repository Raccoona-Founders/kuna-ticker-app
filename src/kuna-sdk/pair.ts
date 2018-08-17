import { Dictionary } from 'lodash';
import { KunaAssetUnit } from './asset';

export type KunaPair = {
    key: string;
    baseCurrency: KunaAssetUnit;
    quoteCurrency: KunaAssetUnit;
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
        baseCurrency: KunaAssetUnit.Ethereum,
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
        baseCurrency: KunaAssetUnit.Waves,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    zecuah: {
        key: 'zecuah',
        baseCurrency: KunaAssetUnit.ZCash,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    bchuah: {
        key: 'bchuah',
        baseCurrency: KunaAssetUnit.BitcoinCash,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[00]',
    },
    gbguah: {
        key: 'gbguah',
        baseCurrency: KunaAssetUnit.GolosGold,
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
        baseCurrency: KunaAssetUnit.Revain,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    arnbtc: {
        key: 'arnbtc',
        baseCurrency: KunaAssetUnit.Aeron,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    evrbtc: {
        key: 'evrbtc',
        baseCurrency: KunaAssetUnit.Everus,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    foodbtc: {
        key: 'foodbtc',
        baseCurrency: KunaAssetUnit.FoodCoin,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    erc20btc: {
        key: 'erc20btc',
        baseCurrency: KunaAssetUnit.ERC20,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[00000]',
    },
    hknbtc: {
        key: 'hknbtc',
        baseCurrency: KunaAssetUnit.Hacken,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    venusbtc: {
        key: 'venusbtc',
        baseCurrency: KunaAssetUnit.Venus,
        quoteCurrency: KunaAssetUnit.Bitcoin,
        format: '0,0.[000000]',
    },
    xlmuah: {
        key: 'xlmuah',
        baseCurrency: KunaAssetUnit.Stellar,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[000000]',
    },
    tusduah: {
        key: 'tusduah',
        baseCurrency: KunaAssetUnit.Tether,
        quoteCurrency: KunaAssetUnit.UkrainianHryvnia,
        format: '0,0.[000000]',
    },

    // to Golos Gold
    golgbg: {
        key: 'golgbg',
        baseCurrency: KunaAssetUnit.Golos,
        quoteCurrency: KunaAssetUnit.GolosGold,
        format: '0,0.[0000]',
    },

    // to Ethereum
    remeth: {
        key: 'remeth',
        baseCurrency: KunaAssetUnit.Remme,
        quoteCurrency: KunaAssetUnit.Ethereum,
        format: '0,0.[00000000]',
    },
};
