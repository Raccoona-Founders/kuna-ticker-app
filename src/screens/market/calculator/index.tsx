import React from 'react';
import Numeral from 'numeral';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { getAsset, KunaMarket, KunaTicker } from 'kuna-sdk';

import { styles } from './calculator-style';
import { Icon } from 'components/icon';

type CalculatorProps = {
    market: KunaMarket;
    ticker: KunaTicker;
};

enum CalcSide {
    Base,
    Revers
}

type CalculatorState = {
    value: string;
    side: CalcSide
};

export class Calculator extends React.PureComponent<CalculatorProps, CalculatorState> {
    public state: CalculatorState = {
        value: '',
        side: CalcSide.Base,
    };

    public render(): JSX.Element {
        const {value, side} = this.state;
        const {market} = this.props;

        return (

            <View style={styles.container}>
                <Text style={styles.topic}>Calculator</Text>
                <View style={styles.calcWrapper}>
                    <View style={styles.valueInputContainer}>
                        <TextInput value={value}
                                   onChangeText={this.changeTextInput}
                                   keyboardType="numeric"
                                   returnKeyType="done"
                                   style={styles.valueInput}
                        />

                        <Text style={styles.valueInputAsset}>
                            {side === CalcSide.Base ? market.baseAsset : market.quoteAsset}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={this.changeCalcSide}>
                        <Icon name="change" size={20} fill="#D0D0D0"/>
                    </TouchableOpacity>

                    <Text style={styles.resultValue}>
                        {this.getCalculatedValue()} {side === CalcSide.Base ? market.quoteAsset : market.baseAsset}
                    </Text>
                </View>
            </View>
        );
    }

    protected changeTextInput = (text: string) => {
        this.setState({
            value: text,
        });
    };

    protected getCalculatedValue(): string {
        const {value, side} = this.state;
        const {ticker, market} = this.props;

        if (!value) {
            return '0';
        }

        const numValue = Numeral(parseFloat(value) || 0);

        if (side === CalcSide.Base) {
            return numValue.multiply(ticker.last).format(getAsset(market.quoteAsset).format);
        }

        return numValue.divide(ticker.last).format(getAsset(market.baseAsset).format);
    }

    protected changeCalcSide = () => {
        const {value, side} = this.state;
        const {ticker, market} = this.props;

        let newSide = side;
        let newValue = Numeral(value || 0);
        let inputSideFormat = '0.[0000]';

        switch (side) {
            case CalcSide.Base: {
                newSide = CalcSide.Revers;
                newValue = newValue.multiply(ticker.last);
                inputSideFormat = getAsset(market.quoteAsset).format;

                break;
            }

            case CalcSide.Revers: {
                newSide = CalcSide.Base;
                newValue = newValue.divide(ticker.last);
                inputSideFormat = getAsset(market.baseAsset).format;

                break;
            }
        }

        this.setState({
            value: newValue.value() > 0
                ? newValue.format(inputSideFormat).replace(/\,/g, '')
                : '',
            side: newSide,
        });
    };
}
