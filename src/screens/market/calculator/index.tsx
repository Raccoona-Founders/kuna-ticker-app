import React from 'react';
import Numeral from 'numeral';
import { View, TextInput, Text } from 'react-native';
import { getAsset, KunaAssetUnit, KunaMarket, KunaTicker } from 'kuna-sdk';
import { SpanText } from 'components/span-text';
import Analitics from 'utils/ga-tracker';
import { styles } from './calculator.style';

type CalculatorProps = {
    market: KunaMarket;
    ticker: KunaTicker;
    usdPrice?: number;
};

enum Operation {
    Buy,
    Sell
}

type CalculatorState = {
    inputBuyValue: string;
    inputSellValue: string;
    trackedInteraction: boolean;
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
                    <SpanText style={styles.assetIconText}>{asset.key}</SpanText>
                </View>
            </View>
        );
    }
}

export class Calculator extends React.PureComponent<CalculatorProps, CalculatorState> {
    public state: CalculatorState = {
        inputBuyValue: '',
        inputSellValue: '',
        trackedInteraction: false,
    };

    public render(): JSX.Element {
        const { inputBuyValue, inputSellValue } = this.state;
        const { market } = this.props;

        return (
            <View style={styles.container}>
                <SpanText style={styles.topic}>Calculate</SpanText>

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

                {this._renderUseEquivalent()}
            </View>
        );
    }

    protected changeTextInput = (type: Operation) => (text: string) => {
        const { ticker, market } = this.props;
        const { trackedInteraction } = this.state;

        if (trackedInteraction === false) {
            Analitics.logEvent('use_calculator', {
                market: market.key,
                operation: type,
            });

            this.setState({ trackedInteraction: true });
        }

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

    protected _renderUseEquivalent(): JSX.Element {
        const { inputBuyValue = '' } = this.state;
        const { usdPrice, market } = this.props;

        const buyAsset = getAsset(market.baseAsset);

        if (!usdPrice || usdPrice <= 0) {
            return <View />;
        }

        return (
            <View style={styles.resultContainer}>
                <SpanText style={styles.resultUsdValue}>
                    <Text style={{ fontWeight: '400' }}>{inputBuyValue || '0'} {buyAsset.key}</Text>
                    <Text> ≈ </Text>
                    <Text>${Numeral(inputBuyValue || 0).multiply(usdPrice).format('0,0[.]00')}</Text>
                </SpanText>
            </View>
        );
    }

}
