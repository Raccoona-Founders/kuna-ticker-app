import React from 'react';
import Tag from 'components/tag';
import { Color } from 'styles/variables';
import { StyleSheet } from 'react-native';

type SideProps = {
    side: 'buy' | 'sell';
};

export default (props: SideProps) => {
    return (
        <Tag style={props.side === 'buy' ? styles.sideBuy : styles.sideSell} styleText={styles.sideText}>
            {props.side}
        </Tag>
    );
};

const styles = StyleSheet.create({
    sideText: {
        textTransform: 'uppercase',
    },
    sideBuy: {
        backgroundColor: Color.Success,
    },
    sideSell: {
        backgroundColor: Color.Danger,
    },
});
