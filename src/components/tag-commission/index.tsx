import React from 'react';
import { View } from 'react-native';
import numeral from 'numeral';
import Tag from 'components/tag';
import { Color } from 'styles/variables';

type CommissionProps = {
    commission: number;
};

export default (props: CommissionProps): JSX.Element => {
    if (props.commission === 0) {
        return <View />;
    }

    let textTemplate = `You pay {value}`;
    if (props.commission < 0) {
        textTemplate = `Maker pays {value}`;
    }

    const comm = numeral(Math.abs(props.commission));

    return (
        <Tag style={{ backgroundColor: Color.Main }}>
            {textTemplate.replace('{value}', comm.format('0,0.[00]%'))}
        </Tag>
    );
};
