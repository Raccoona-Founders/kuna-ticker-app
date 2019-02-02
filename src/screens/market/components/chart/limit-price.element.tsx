import React from 'react';
import numeral from 'numeral';
import { Line, G, Text } from 'react-native-svg';
import { Color, Fonts } from 'styles/variables';

type Props = any & {
    price: number;
    format: string;
    side: 'top' | 'bottom';
};

export default ({ price, format, side, x, y }: Props) => {
    const textY = y(price) + (side == 'top' ? -10 : 10);

    return (
        <G>
            <Line key="element"
                  x1="97%"
                  x2="100%"
                  y1={y(price)}
                  y2={y(price)}
                  stroke={Color.DarkPurple}
                  strokeWidth={1}
            />

            <Text
                x="97%"
                dy={textY}
                alignmentBaseline="middle"
                textAnchor="end"
                fontFamily={Fonts.TTNorms_Regular}
            >
                {numeral(price).format(format)}
            </Text>
        </G>
    )
};
