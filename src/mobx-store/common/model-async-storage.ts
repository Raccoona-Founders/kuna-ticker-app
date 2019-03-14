import { set, autorun, toJS, action } from 'mobx';
import { AsyncStorage } from 'react-native';

export default abstract class ModelAsyncStorage {
    public abstract getStoreKey(): string;

    private __firstRun: boolean = false;

    @action
    public async initialize(): Promise<void> {
        const existingStore = await AsyncStorage.getItem(this.getStoreKey());

        if (existingStore) {
            const storeValue = JSON.parse(existingStore);
            if (storeValue) {
                this._fromJSON(storeValue);
            }
        }

        autorun(this.__autorun);
    }

    protected _toJSON(): Object {
        const result = toJS(this);
        delete result.__firstRun;

        return result;
    }

    @action
    protected _fromJSON(object: Object) {
        set(this, object);
    }

    private __autorun = async (): Promise<void> => {
        if (this.__firstRun) {
            this.__firstRun = true;

            return;
        }

        await AsyncStorage.setItem(
            this.getStoreKey(),
            JSON.stringify(this._toJSON()),
        );
    };
}
