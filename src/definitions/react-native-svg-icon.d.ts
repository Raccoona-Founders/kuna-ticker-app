declare module 'react-native-svg-icon' {
    import * as React from 'react';

    export type SvgIconProps = {
        svg: React.ReactNode;
        viewBox?: string;
    };

    export type IconSetProps = {
        svgs: Record<string, SvgIconProps>;
        name: string;
        fill: string;
        height: number | string;

        defaultViewBox?: string;
        style?: any;
        stroke?: string;
        width?: string | number;
        viewBox?: string;
    };

    export const SvgIcon: React.ComponentClass<IconSetProps>;
    export default SvgIcon;
}
