import firebase from 'react-native-firebase';

firebase.analytics().setUserProperty('ENV', 'TEST');

function trackScreen(screenName: string | null, screenClassOverride?: string) {
    firebase.analytics().setCurrentScreen(screenName, screenClassOverride);
}

function logEvent(eventKey: string, params?: Object) {
    firebase.analytics().logEvent(eventKey, params);
}

export default {
    trackScreen,
    logEvent,
};