import { Platform } from 'react-native';

export enum Color {
    Main = '#5850FA',
    Secondary = '#3DC3FA',

    Purple = '#312A7D',
    Fade = '#676793',
    DarkPurple = '#0D0D3F',

    Text = '#4A4A4A',
    SecondaryText = '#5A5A5A',

    DeepBlue = '#2E71F0',

    PurpleNoactive = '#9DA3B8',

    GrayBlues = '#93A9C3',
    Gray3 = '#E6EAEE',
    GrayWhite = '#F5F7F8',

    GrayLight = '#F2F2F2',


    White = '#FFFFFF',
    Black = '#000000',


    Success = '#00BA4F',
    Danger = '#FD2A47',
}

export const Fonts = {
    TTNorms_Bold: 'TTNorms-Bold',
    TTNorms_Medium: 'TTNorms-Medium',
    TTNorms_Regular: 'TTNorms-Regular',
};


export const DefaultStyles: any = {
    thinFont: {
        fontWeight: '400',
        fontFamily: Fonts.TTNorms_Regular,
    },
    mediumFont: {
        fontWeight: '500',
        fontFamily: Fonts.TTNorms_Medium,
    },
    boldFont: {
        fontWeight: '700',
        fontFamily: Fonts.TTNorms_Bold,
    },
};
