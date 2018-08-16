import { Dictionary } from 'lodash';

export enum KunaAssetUnit {
    Bitcoin = 'BTC',
    Ethereum = 'ETH',
    Dash = 'DASH',
    Litecoin = 'LTC',
    BitcoinCash = 'BCH',
    Ripple = 'XRP',

    Waves = 'WAVES',
    Golos = 'GOL',
    GolosGold = 'GBG',

    RussianMinerCoin = 'RMC',
    Revain = 'R',
    Aeron = 'ARN',
    Karbo = 'KRB',
    Remme = 'REM',
    Nem = 'XEM',
    Everus = 'EVR',
    ERC20 = 'ERC20',
    Venus = 'VENUS',
    EOS = 'EOS',

    KunaToken = 'KUN',

    UkrainianHryvnia = 'UAH'
}

export type KunaAsset = {
    key: KunaAssetUnit | string;
    name: string
    color: string
    format: string
}

export const kunaAssets: Dictionary<KunaAsset> = {
    BTC: {
        key: KunaAssetUnit.Bitcoin,
        name: 'Bitcoin',
        color: '#f7931a',
        format: '0,0.[000000]'
    },
    ETH: {
        key: KunaAssetUnit.Ethereum,
        name: 'Ethereum',
        color: '#434348',
        format: '0,0.[0000]'
    },
    DASH: {
        key: KunaAssetUnit.Dash,
        name: 'Dash',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    LTC: {
        key: KunaAssetUnit.Litecoin,
        name: 'Litecoin',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    UAH: {
        key: KunaAssetUnit.UkrainianHryvnia,
        name: 'Ukrainian Hryvnia',
        color: '#d8c566',
        format: '0,0.[00]'
    },
    KUN: {
        key: KunaAssetUnit.KunaToken,
        name: 'Kun',
        color: '#11a0ff',
        format: '0,0'
    },
    BCH: {
        key: KunaAssetUnit.BitcoinCash,
        name: 'Bitcoin Cash',
        color: '#f7931a',
        format: '0,0.[0000]'
    },
    WAVES: {
        key: KunaAssetUnit.Waves,
        name: 'Waves',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    GBG: {
        key: KunaAssetUnit.GolosGold,
        name: 'Golos Gold',
        color: '#dab236',
        format: '0,0.[0000]'
    },
    GOL: {
        key: KunaAssetUnit.Golos,
        name: 'Golos',
        color: '#2768aa',
        format: '0,0.[0000]'
    },
    RMC: {
        key: KunaAssetUnit.RussianMinerCoin,
        name: 'Russian Miner Coin',
        color: '#d21f26',
        format: '0,0.[00]'
    },
    R: {
        key: KunaAssetUnit.Revain,
        name: 'Revain',
        color: '#bd2df5',
        format: '0,0.[0000]'
    },
    ARN: {
        key: KunaAssetUnit.Aeron,
        name: 'Aeron',
        color: '#135180',
        format: '0,0.[0000]'
    },
    EVR: {
        key: KunaAssetUnit.Everus,
        name: 'Everus',
        color: '#35beb4',
        format: '0,0.[0000]'
    },
    B2B: {
        key: 'B2B',
        name: 'B2bx',
        color: '#00a275',
        format: '0,0.[0000]'
    },
    XRP: {
        key: KunaAssetUnit.Ripple,
        name: 'Ripple',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    EOS: {
        key: KunaAssetUnit.EOS,
        name: 'EOS',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    FOOD: {
        key: 'FOOD',
        name: 'FoodCoin',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    OTX: {
        key: 'OTX',
        name: 'Octanox',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    HKN: {
        key: 'HKN',
        name: 'Hacken',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    XLM: {
        key: 'XLM',
        name: 'Stellar',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    TUSD: {
        key: 'TUSD',
        name: 'Tether',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    ZEC: {
        key: 'ZEC',
        name: 'ZCash',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    VENUS: {
        key: KunaAssetUnit.Venus,
        name: 'Venus',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    ERC20: {
        key: KunaAssetUnit.ERC20,
        name: 'ERC20',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    REM: {
        key: KunaAssetUnit.Remme,
        name: 'Remme',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    KRB: {
        key: KunaAssetUnit.Karbo,
        name: 'Karbo',
        color: '#0096C8',
        format: '0,0.[0000]'
    },
    XEM: {
        key: KunaAssetUnit.Nem,
        name: 'Nem',
        color: '#0096C8',
        format: '0,0.[0000]'
    }
};
