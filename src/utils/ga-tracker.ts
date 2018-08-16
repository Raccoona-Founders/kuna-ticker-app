import DeviceInfo from 'react-native-device-info';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

export const tracker = new GoogleAnalyticsTracker('UA-64948076-11');

tracker.setAppName(DeviceInfo.getApplicationName());
tracker.setAppVersion(DeviceInfo.getVersion());
