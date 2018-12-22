import React from 'react';
import numeral from 'numeral';
import { View, Text } from 'react-native';
import { getAsset, KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import { SpanText } from 'components/span-text';
import CalcAssetRow from '../calc-asset-row';
import { styles } from './last-trade.style';

type LastTradeCalcProps = {
    market: KunaMarket;
    ticker: KunaV3Ticker;
    usdPrice?: number;
};

enum Operation {
    Buy,
    Sell
}

type LastTradeCalcState = {
    inputBuyValue: string;
    inputSellValue: string;
    trackedInteraction: boolean;
};

export default class LastTradeCalc extends React.PureComponent<LastTradeCalcProps, LastTradeCalcState> {
    public state: LastTradeCalcState = {
        inputBuyValue: '',
        inputSellValue: '',
        trackedInteraction: false,
    };


    public render(): JSX.Element {
        const { inputBuyValue, inputSellValue } = this.state;
        const { market, ticker } = this.props;

        if (!ticker.lastPrice) {
            return <View />;
        }

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

                {this.__renderUseEquivalent()}
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

        text.replace(/\s/gm, '').replace(/,/gm, '.');
        if (text.length === 2 && text[0] == '0' && text[1] != '.') {
            text = text[0] + '.' + text[1];
        }

        const textNumber = numeral(text);

        if (text && text.length > 0) {
            switch (type) {
                case Operation.Sell:
                    toUpdateState.inputSellValue = text;
                    toUpdateState.inputBuyValue
                        = textNumber.divide(ticker.lastPrice || 0).format(buyAsset.format);
                    break;

                case Operation.Buy:
                    toUpdateState.inputBuyValue = text;
                    toUpdateState.inputSellValue
                        = textNumber.multiply(ticker.lastPrice || 0).format(sellAsset.format);
                    break;
            }
        }

        this.setState(toUpdateState);
    };

    private __renderUseEquivalent(): JSX.Element {
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
                    <Text> ~ </Text>
                    <Text>${numeral(inputBuyValue || 0).multiply(usdPrice).format('0,0.00')}</Text>
                </SpanText>
            </View>
        );
    }
}
