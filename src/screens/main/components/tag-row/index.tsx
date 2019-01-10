import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import { getAsset, KunaAssetUnit } from 'kuna-sdk';

const FAVORITE_KEY = 'favorite';

const coinTags: string[] = [
    KunaAssetUnit.UkrainianHryvnia,
    KunaAssetUnit.Bitcoin,
    KunaAssetUnit.Ethereum,
    KunaAssetUnit.AdvancedUSD,
    KunaAssetUnit.AdvancedRUB,
    KunaAssetUnit.GolosGold,
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

    protected __renderTag = (assetUnit: string, index: number) => {

        const asset = getAsset(assetUnit as KunaAssetUnit);

        const specificTagStyle: any = {};
        const specificTextStyle: any = {};

        if (asset) {
            specificTextStyle.color = asset.color;
        }

        const isActive = index === this.state.currentActiveTagIndex;

        const tagStyle = [
            styles.tagCell,
            specificTagStyle,
            isActive ? styles.tagCellActive : undefined,
        ];

        const textStyles = [
            specificTextStyle,
            isActive ? styles.textActive : undefined,
        ];

        return (
            <TouchableOpacity key={assetUnit} style={tagStyle} onPress={this.__onPressTag(index)}>
                <SpanText style={textStyles}>{assetUnit}</SpanText>
            </TouchableOpacity>
        );
    };


    protected __onPressTag = (index: number) => {
        const { onChooseTag } = this.props;

        return () => {
            let assetUnit = coinTags[index];
            if (index !== this.state.currentActiveTagIndex) {
                this.setState({ currentActiveTagIndex: index });
                onChooseTag && onChooseTag(
                    index,
                    assetUnit !== FAVORITE_KEY ? assetUnit as KunaAssetUnit : undefined,
                );
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
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: Color.Gray3,
        borderRadius: 20,
    },
    tagCellActive: {
        backgroundColor: Color.Gray3,
    },

    textActive: {
        color: Color.Text,
        fontWeight: '700',
    },
});
