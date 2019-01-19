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

    return <Tag style={{ backgroundColor: Color.Main }}>
        {`Fee ${numeral(props.commission).format('+0,0.[00]%')}`}
    </Tag>;
};
