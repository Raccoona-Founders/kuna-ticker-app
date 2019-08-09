import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import { svgs } from './svg-map';

type IconProps = {
    name: string;
    fill?: string;
    style?: any;
    size?: number;
};

export default function Icon(props: IconProps): JSX.Element {
    const { style, name, fill = '#222', size = 28, ...anyProps } = props;

    return (
        <SvgIcon
            svgs={svgs}
            style={style}
            name={name}
            fill={fill}
            height={size}
            width={size}
            {...anyProps}
        />
    );
};
