import firebase from 'react-native-firebase';

firebase.analytics().setUserProperty('ENV', 'TEST');

export function trackScreen(screenName: string | null, screenClassOverride?: string) {
    firebase.analytics().setCurrentScreen(screenName, screenClassOverride);
}
