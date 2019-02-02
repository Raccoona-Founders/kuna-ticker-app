import React from 'react';
import { Line } from 'react-native-svg';
import { Color } from 'styles/variables';

export default (({ lastPrice, y }: any) => (
    <Line key="zero-axis"
          x1="0%"
          x2="100%"
          y1={y(lastPrice)}
          y2={y(lastPrice)}
          stroke={Color.DarkPurple}
          strokeDasharray={[4, 8]}
          strokeWidth={1}
    />
));
