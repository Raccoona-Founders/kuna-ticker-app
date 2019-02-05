import { Dimensions, Platform } from 'react-native';
import numeral from 'numeral';

export async function wait(delay: number = 1000): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
}

export function isIphoneX() {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&
        (
            // Check iPhones X, Xs
            (height === 812 || width === 812) ||

            // Check iPhones  XR, Xs Max
            (height === 896 || width === 896)
        )
    );
}

export function vw(percentageWidth: number = 100) {
    return Dimensions.get('window').width * (percentageWidth / 100);
}

export function vh(percentageHeight: number = 100) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

export function format(n: number, decimal: number = 2): string {
    return numeral(n || 0).format('0,0.[00]');
}
