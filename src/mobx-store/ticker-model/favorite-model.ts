import { action, observable } from 'mobx';

export default class FavoriteModel implements mobx.ticker.FavoriteModel {
    @observable
    protected _symbols: Array<string> = [
        'btcuah',
        'kunbtc',
    ];

    public exists(marketSymbol: string): boolean {
        return this._symbols.indexOf(marketSymbol) >= 0;
    }

    @action
    public add(marketSymbol: string): void {
        if (this.exists(marketSymbol)) {
            return;
        }

        this._symbols.push(marketSymbol);
    }

    public getList(): string[] {
        return this._symbols;
    }

    @action
    public remove(marketSymbol: string): void {
        this._symbols.splice(this._symbols.indexOf(marketSymbol), 1);
    }

    @action
    public setList(marketSymbols: string[]): void {
        this._symbols = marketSymbols;
    }
}
