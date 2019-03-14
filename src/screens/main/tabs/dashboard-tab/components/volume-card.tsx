import React from 'react';
import Numeral from 'numeral';
import { StyleSheet, View } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';
import SpanText from 'components/span-text';

type Props = {
    volumeUSD: number;
    volumeBTC: number;
};

export default class VolumeCard extends React.Component<Props> {
    public render(): JSX.Element {

        const {volumeUSD, volumeBTC} = this.props;

        return (
            <View style={styles.box}>

                <SpanText style={styles.title}>24H Volume</SpanText>
                <SpanText style={styles.volumeUSD}>
                    ${Numeral(volumeUSD).format('0,0')}
                </SpanText>

                <SpanText style={styles.volumeBTC}>
                    {Numeral(volumeBTC).format('0,0.[00]')} BTC
                </SpanText>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    box: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

    title: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: Color.GrayBlues,
        marginBottom: 5,
    },

    volumeUSD: {
        fontSize: 28,
        ...DefaultStyles.boldFont,
    },
    volumeBTC: {
        fontSize: 16,
        color: Color.Success,
    },
});
