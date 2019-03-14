import React from 'react';
import numeral from 'numeral';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import SpanText from 'components/span-text/index';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from 'styles/variables';

type ChangePercentProps = {
    percent: number;
    style?: StyleProp<ViewStyle>;
};

export default (props: ChangePercentProps): JSX.Element => {
    const {style, percent} = props;
    const isPositive = percent > 0;

    return (
        <View style={[styles.box, style]}>
            <FontAwesome5Icon
                name={isPositive ? 'caret-up' : 'caret-down'}
                style={[styles.caret, isPositive ? styles.caretUp : styles.caretDown]}
            />
            <SpanText style={[styles.label, isPositive ? styles.labelUp : styles.labelDown]}>
                ({numeral(props.percent).format('0,0.[00]')}%)
            </SpanText>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    caret: {
        marginRight: 3,
    },

    caretUp: {
        color: Color.Success,
    },
    caretDown: {
        color: Color.Danger,
    },

    label: {
        fontSize: 14,
    },
    labelUp: {
        color: Color.Success,
    },
    labelDown: {
        color: Color.Danger,
    },

});
