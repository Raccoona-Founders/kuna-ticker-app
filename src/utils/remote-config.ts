import firebase from 'react-native-firebase';

const config = firebase.config();

if (__DEV__) {
    config.enableDeveloperMode();
}

config.setDefaults({
    riddles__4_config: undefined,
    ab_test_ads_1: false,
});

const configure = async () => {
    await config.fetch(14400);

    const activated = await config.activateFetched();

    if (!activated) {
        console.log('Fetched data not activated');
    }
};

const getValue = (key: string) => {
    return config.getValue(key);
};

const getValues = (keys: string[]) => {
    return config.getValues(keys);
};

export default { configure, getValue, getValues };
