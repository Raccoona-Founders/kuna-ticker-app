import React from 'react';
import { KunaAssetUnit } from 'kuna-sdk';

export type AssetTab = {
    key: KunaAssetUnit;
    title: string;
};

export const quoteAssets: AssetTab[] = [
    {key: KunaAssetUnit.UkrainianHryvnia, title: 'UAH'},
    {key: KunaAssetUnit.Bitcoin, title: 'BTC'},
    {key: KunaAssetUnit.StasisEuro, title: 'EURS'},
    {key: KunaAssetUnit.Ethereum, title: 'ETH'},
    {key: KunaAssetUnit.GolosGold, title: 'GBG'},
];

