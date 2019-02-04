import React from 'react';
import { Rect } from 'react-native-svg';
import { Color } from 'styles/variables';

export default (({ minValue, y }: any) => (
    <Rect x="0"
          y={y(minValue)}
          width="100%"
          height="20%"
          fill={Color.Main}
    />
));
