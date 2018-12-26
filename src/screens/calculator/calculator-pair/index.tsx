import React from 'react';
import numeral from 'numeral';
import { View } from 'react-native';
import { getAsset, KunaMarket } from 'kuna-sdk';
import CalcAssetRow from './calc-asset-row';
import styles from './calculator-pair.style';

type CalculatorPairProps = {
    market: KunaMarket;
    processCalculating: (value: number, type: Operation) => [number, number];
};

export enum Operation {
    Buy,
    Sell
}

type LastTradeCalcState = {
    inputBuyValue: string;
    inputSellValue: string;
};

export default class CalculatorPair extends React.PureComponent<CalculatorPairProps, LastTradeCalcState> {
    public state: LastTradeCalcState = {
        inputBuyValue: '',
        inputSellValue: '',
    };

    public render(): JSX.Element {
        const { inputBuyValue, inputSellValue } = this.state;
        const { market } = this.props;

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
        const { market } = this.props;

        if (text.length > 24) {
            text = text.substr(0, 24);
        }

        text = text.replace(/\s/gm, '')
            .replace(/,/gm, '.');

        if (text.length === 2 && text[0] == '0' && text[1] != '.') {
            text = text[0] + '.' + text[1];
        }
        
        const [buy, sell] = this.props.processCalculating(+text, type);

        const updateState = {
            inputBuyValue: '',
            inputSellValue: '',
        };

        if (buy && buy > 0) {
            const buyAsset = getAsset(market.baseAsset);
            updateState.inputBuyValue = numeral(buy).format(buyAsset.format);
        }

        if (sell && sell > 0) {
            const sellAsset = getAsset(market.quoteAsset);
            updateState.inputSellValue = numeral(sell).format(sellAsset.format);
        }

        this.setState(updateState);
    };
}
