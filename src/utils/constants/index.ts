import { Platform } from 'react-native';
import { isIphoneX } from 'utils/helper';

export default {
    IS_IPHONE_X: isIphoneX(),
    KUNA_CODE_MARKETPLACE_BASE_URL: 'https://us-central1-kuna-ticker-mobile.cloudfunctions.net',

    ...Platform.select({
        ios: {
            ADMOB_APP_ID: 'ca-app-pub-4733255242870112~7529604809',
            ADMOB_BANNERS: {
                test: 'ca-app-pub-4733255242870112/4276558726',
            },
        },
        android: {
            ADMOB_APP_ID: 'ca-app-pub-4733255242870112~7307859203',
            ADMOB_BANNERS: {
                test: 'ca-app-pub-4733255242870112/9167735782',
            },
        },
    }),
};
