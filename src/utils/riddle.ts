import { config } from 'react-native-firebase';

export async function fetchRiddle4Config(): Promise<any> {
    const response = await config().getValue('riddles__4_config');
    const riddleConfig = response.val();

    if (!riddleConfig) {
        throw new Error('Inactive');
    }

    return JSON.parse(riddleConfig);
}
