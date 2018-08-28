import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import { svgs } from './svg-map';

type IconProps = {
    name: string;
    fill?: string;
    size?: number;
};

export const Icon = (props: IconProps) => (
    <SvgIcon svgs={svgs}
             name={props.name}
             fill={props.fill || '#000'}
             height={props.size || 32}
    />
);
