import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { Color, DefaultStyles } from 'styles/variables';
import { StyleSheet } from 'react-native';

const Gradient = ({ index }: any) => (
    <Defs key={index}>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Color.Main} stopOpacity={0.8} />
            <Stop offset="100%" stopColor={Color.Main} stopOpacity={0.2} />
        </LinearGradient>
    </Defs>
);

const sheet = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 20,
        right: 0,
        left: 0,
        zIndex: 10
    },

    chartContainer: {
        height: 200,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    tagContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
    },

    tagUnit: {
        ...DefaultStyles.boldFont,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        color: Color.GrayBlues,
    },
    tagUnitActive: {
        color: Color.Main,
    },
});


export default {
    Gradient,
    sheet,
};
