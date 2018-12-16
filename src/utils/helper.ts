import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&

        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
}

export function vw(percentageWidth: number = 100) {
    return Dimensions.get('window').width * (percentageWidth / 100);
}

export function vh(percentageHeight: number = 100) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}
