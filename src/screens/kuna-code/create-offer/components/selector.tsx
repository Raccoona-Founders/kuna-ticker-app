import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import SpanText from 'components/span-text';
import { Color, DefaultStyles } from 'styles/variables';

type SelectorItem = {
    label: string;
    value: string;
};

type SelectorProps = {
    items: SelectorItem[];
    style?: StyleProp<ViewStyle>;
    selectedValue?: string;
    onValueChange?: (value: string, index: number) => void;
};

export default class Selector extends React.PureComponent<SelectorProps> {
    public render(): JSX.Element {
        return (
            <View style={[styles.box, this.props.style]}>
                {this.props.items.map(this.__renderItem)}
            </View>
        );
    }

    protected __renderItem = (item: SelectorItem, index: number) => {
        const { selectedValue, onValueChange } = this.props;
        const isSelected = item.value === selectedValue;


        return (
            <TouchableOpacity key={index}
                              onPress={onValueChange ? () => onValueChange(item.value, index) : undefined}
                              style={styles.item}
            >
                <SpanText style={[styles.itemText, isSelected && styles.itemTextActive]}>
                    {item.label || item.value}
                </SpanText>
            </TouchableOpacity>
        );
    };
}


const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
    },
    item: {
        marginRight: 20,
    },

    itemText: {
        color: Color.GrayBlues,
        fontSize: 18,
    },

    itemTextActive: {
        color: Color.Text,
        ...DefaultStyles.boldFont,
    },
});
