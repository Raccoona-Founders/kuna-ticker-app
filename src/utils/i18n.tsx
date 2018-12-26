import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

// Import all locales
import en from '../locales/en.json';
import ua from '../locales/ua.json';
import ru from '../locales/ru.json';


i18n.defaultLocale = 'en';
i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, ua, ru };

export function _(scope: string, params = {}) {
    return i18n.t(scope, params);
}

export default i18n;