import firebase from 'react-native-firebase';
import { action, observable } from 'mobx';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';

export default class UserModel extends ModelAsyncStorage implements mobx.user.StoreModel {
    @observable
    public userId?: string;

    @observable
    public displayName?: string;

    @observable
    public telegram?: string;

    @action
    public static create(): UserModel {
        return new UserModel();
    }

    public getStoreKey(): string {
        return 'KunaTicker@Mobx_User';
    }

    public async initialize(): Promise<void> {
        await super.initialize();

        if (!this.userId) {
            await this.__generateUserId();
        }

        firebase.analytics().setUserId(this.userId as string);
    }

    @action
    public setDisplayName(name: string): void {
        this.displayName = name;
    }

    @action
    public setTelegram(telegram: string): void {
        this.telegram = telegram;
    }

    public static randomNumber(from: number = 0, to: number = 100): number {
        return Math.floor(Math.random() * to) + from;
    }

    public static randomChart() {
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    @action
    private __generateUserId() {
        const firstChart = UserModel.randomChart();
        const randomNumber = UserModel.randomNumber(100000, 999999);

        this.userId = firstChart + randomNumber.toFixed();
    }
}
