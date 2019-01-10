import firebase from 'react-native-firebase';

/* @TODO Need to review this options for paranoia users T-T */
firebase.analytics().setAnalyticsCollectionEnabled(true);

firebase.analytics().setUserProperty('ENV', 'Release');

function setUserProperty(name: string, value: string) {
    firebase.analytics().setUserProperty(name, value);
}

function trackScreen(screenName: string | null, screenClassOverride?: string) {
    firebase.analytics().setCurrentScreen(screenName, screenClassOverride);
}

function logEvent(eventKey: string, params?: Object) {
    firebase.analytics().logEvent(eventKey, params);
}

export default { trackScreen, logEvent, setUserProperty };
