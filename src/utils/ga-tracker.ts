import firebase from 'react-native-firebase';

export function trackScreen(screenName: string | null, screenClassOverride?: string) {
    firebase.analytics().setCurrentScreen(screenName, screenClassOverride);
}
