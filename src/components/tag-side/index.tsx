import React from 'react';
import { StyleSheet } from 'react-native';
import { _ } from 'utils/i18n';
import Tag from 'components/tag';
import { Color } from 'styles/variables';

type SideProps = {
    side: 'buy' | 'sell';
};


export default (props: SideProps) => {
    return (
        <Tag style={props.side === 'buy' ? styles.sideBuy : styles.sideSell} styleText={styles.sideText}>
            {props.side === 'buy' ? _('kuna-code.buy') : _('kuna-code.sell')}
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
