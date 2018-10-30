import React from 'react';
import Numeral from 'numeral';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { getAsset, KunaAssetUnit, KunaMarket, KunaTicker } from 'kuna-sdk';

import { Icon } from 'components/icon';
import { styles } from './calculator.style';
import { CoinIcon } from 'components/coin-icon';

type CalculatorProps = {
    market: KunaMarket;
    ticker: KunaTicker;

    usdPrice?: Numeral;
};

enum Operation {
    Buy,
    Sell
}

type CalculatorState = {
    inputBuyValue: string;
    inputSellValue: string;
};


type CalcAssetRowProps = {
    asset: KunaAssetUnit;
    value: string;
    onChangeText: (text: string) => void;
};

class CalcAssetRow extends React.PureComponent<CalcAssetRowProps> {
    public render(): JSX.Element {

        const asset = getAsset(this.props.asset);

        return (
            <View style={styles.calcAssetRow}>
                <TextInput style={styles.valueInput}
                           value={this.props.value}
                           placeholder="0.00"
                           onChangeText={this.props.onChangeText}
                           keyboardType="numeric"
                           returnKeyType="done"

                />
                
                <View style={styles.assetIcon} pointerEvents="box-none">
                    <Text style={styles.assetIconText}>{asset.key}</Text>
                </View>
            </View>
        );
    }
}

export class Calculator extends React.PureComponent<CalculatorProps, CalculatorState> {
    public state: CalculatorState = {
        inputBuyValue: '',
        inputSellValue: '',
    };

    public render(): JSX.Element {
        const { inputBuyValue, inputSellValue } = this.state;
        const { market, usdPrice } = this.props;

        return (
            <View style={styles.container}>
                <CalcAssetRow
                    asset={market.baseAsset}
                    value={inputBuyValue}
                    onChangeText={this.changeTextInput(Operation.Buy)}
                />

                <CalcAssetRow
                    asset={market.quoteAsset}
                    value={inputSellValue}
                    onChangeText={this.changeTextInput(Operation.Sell)}
                />
            </View>
        );
    }

    protected changeTextInput = (type: Operation) => (text: string) => {
        const { ticker, market } = this.props;

        const buyAsset = getAsset(market.baseAsset);
        const sellAsset = getAsset(market.quoteAsset);

        const toUpdateState = {
            inputBuyValue: '',
            inputSellValue: '',
        };

        if (text.length > 24) {
            text = text.substr(0, 24);
        }

        const textNumber = Numeral(text);

        if (text && text.length > 0 && textNumber && textNumber.value() > 0) {
            switch (type) {
                case Operation.Sell:
                    toUpdateState.inputSellValue = text;
                    toUpdateState.inputBuyValue = textNumber.divide(ticker.last).format(buyAsset.format);
                    break;

                case Operation.Buy:
                    toUpdateState.inputBuyValue = text;
                    toUpdateState.inputSellValue = textNumber.multiply(ticker.last).format(sellAsset.format);
                    break;
            }
        }

        this.setState(toUpdateState);
    };

}
