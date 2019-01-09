import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import { KunaAssetUnit } from 'kuna-sdk';

const coinTags = [
    'favorite',
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.AdvancedUSD,
    KunaAssetUnit.AdvancedRUB,
    KunaAssetUnit.Golos,
];

type State = {
    currentActiveTagIndex?: number;
};

type TagRowProps = {
    onChooseTag: (index?: number, assetUnit?: KunaAssetUnit) => void;
    activeTagIndex?: number;
}

export default class TagRow extends React.PureComponent<TagRowProps, State> {
    public state: State = {
        currentActiveTagIndex: undefined,
    };

    public constructor(props: TagRowProps) {
        super(props);

        if (props.activeTagIndex !== undefined && (props.activeTagIndex in coinTags)) {
            this.state.currentActiveTagIndex = props.activeTagIndex;
        }
    }

    public render(): JSX.Element {
        return (
            <ScrollView scrollEnabled={false}>
                {/* @TODO Its hack we use to remove nested scrolling !!! */}
                <ScrollView
                    style={styles.tagScrollView}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled={false}
                    overScrollMode="never"
                >
                    <View style={styles.tagContainer}>
                        {coinTags.map(this.__renderTag)}
                    </View>
                </ScrollView>
            </ScrollView>
        );
    }

    protected __renderTag = (asset: string, index: number) => (
        <TouchableOpacity
            style={[styles.tagCell, index === this.state.currentActiveTagIndex ? styles.tagCellActive : undefined]}
            key={asset}
            onPress={this.__onPressTag(index)}
        >
            <SpanText>{asset}</SpanText>
        </TouchableOpacity>
    );


    protected __onPressTag = (index: number) => {
        const { onChooseTag } = this.props;

        return () => {
            let assetUnit = index ? coinTags[index] : undefined;
            if (index !== this.state.currentActiveTagIndex) {
                this.setState({ currentActiveTagIndex: index });
                onChooseTag && onChooseTag(index, assetUnit as KunaAssetUnit);
            } else {
                this.setState({ currentActiveTagIndex: undefined });
                onChooseTag && onChooseTag();
            }
        };
    };
}


const styles = StyleSheet.create({
    tagScrollView: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    tagCell: {
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: Color.Gray3,
        borderRadius: 5,
    },
    tagCellActive: {
        backgroundColor: Color.Gray3,
    },
});
