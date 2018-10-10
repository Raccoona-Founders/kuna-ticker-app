import React from 'react';
import Numeral from 'numeral';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { getAsset, KunaMarket, KunaTicker } from 'kuna-sdk';

import { Icon } from 'components/icon';
import { styles } from './calculator.style';

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
    value: string;
    side: Operation
};

export class Calculator extends React.PureComponent<CalculatorProps, CalculatorState> {
    public state: CalculatorState = {
        value: '',
        side: Operation.Buy,
    };

    public render(): JSX.Element {
        const { value, side } = this.state;
        const { market, usdPrice } = this.props;


        let usdValue = null;

        if (usdPrice) {
            usdValue = (side === Operation.Buy)
                ? usdPrice.multiply(this.getCalculatedValue().replace(',', ''))
                : usdPrice.multiply(value.replace(',', ''));
        }


        return (
            <View style={styles.container}>
                <View style={styles.valueInputContainer}>
                    <TextInput style={styles.valueInput}
                               value={value}
                               placeholder="0.00"
                               onChangeText={this.changeTextInput}
                               keyboardType="numeric"
                               returnKeyType="done"
                    />

                    <Text style={styles.valueInputAsset}>
                        {side === Operation.Buy ? market.baseAsset : market.quoteAsset}
                    </Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={this.changeCalcSide} style={styles.changeButton}>
                        <Icon name="change" size={24} fill="#D0D0D0" />
                    </TouchableOpacity>
                </View>

                <View style={styles.resultValueContainer}>
                    {usdValue && (
                        <Text style={styles.resultValueText}>
                            {usdValue.format('$ 0,0.[00]')}
                        </Text>
                    )}

                    <Text style={styles.resultValueText}>
                        <Text>{this.getCalculatedValue()}</Text>
                        <Text> </Text>
                        <Text style={styles.resultValueTextAsset}>
                            {side === Operation.Buy ? market.quoteAsset : market.baseAsset}
                        </Text>
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
        const { value, side } = this.state;
        const { ticker, market } = this.props;

        if (!value) {
            return '0';
        }

        const numValue = Numeral(parseFloat(value) || 0);

        if (side === Operation.Buy) {
            return numValue.multiply(ticker.last).format(getAsset(market.quoteAsset).format);
        }

        return numValue.divide(ticker.last).format(getAsset(market.baseAsset).format);
    }

    protected changeCalcSide = () => {
        const { value, side } = this.state;
        const { ticker, market } = this.props;

        let newSide = side;
        let newValue = Numeral(value || 0);
        let inputSideFormat = '0.[0000]';

        switch (side) {
            case Operation.Buy: {
                newSide = Operation.Sell;
                newValue = newValue.multiply(ticker.last);
                inputSideFormat = getAsset(market.quoteAsset).format;

                break;
            }

            case Operation.Sell: {
                newSide = Operation.Buy;
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
