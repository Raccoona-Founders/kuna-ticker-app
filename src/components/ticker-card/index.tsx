import React from 'react';
import { KunaV3Ticker } from 'kuna-sdk';
import { UsdCalculator } from 'utils/currency-rate';

type TickerCardProps = {
    ticker: KunaV3Ticker;
    usdCalculator: UsdCalculator;
    onPress?: () => void;
};

export default class TickerCard extends React.PureComponent<TickerCardProps> {

}
