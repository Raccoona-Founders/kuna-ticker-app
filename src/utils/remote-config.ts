import firebase from 'react-native-firebase';

const config = firebase.config();

if (__DEV__) {
    config.enableDeveloperMode();
}

config.setDefaults({
    riddles__4_config: undefined,
});


const configureRemoteConfig = async () => {
    await config.fetch(14400);

    const activated = await config.activateFetched();

    if (!activated) {
        console.log('Fetched data not activated');
    }
};

export default configureRemoteConfig;
