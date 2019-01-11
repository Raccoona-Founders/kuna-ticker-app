import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import { svgs } from './svg-map';

type IconProps = {
    name: string;
    fill?: string;
    style?: any;
    height?: number;
    width?: number;
};

export const Icon = (props: IconProps) => {
    const { style, name, fill = '#222', height = 32, width, ...anyProps } = props;

    return (
        <SvgIcon
            svgs={svgs}
            style={style}
            name={name}
            fill={fill}
            height={height}
            width={width || height}
            {...anyProps}
        />
    );
};

export default Icon;
