import { KunaV3Ticker } from 'kuna-sdk';
import { UsdCalculator } from 'utils/currency-rate';

declare global {
    export type MobxStore
        = MobxUsdRate.WithUsdRateProps
        & MobxTicker.WithTickerProps
        & MobxUser.WithUserProps;

    namespace MobxUsdRate {
        export interface StoreModel {
            rate: number;
            lastUpdate?: string;

            updateUsdRate(): Promise<number>;
        }

        export type WithUsdRateProps = {
            UsdRate: StoreModel,
        };
    }

    namespace MobxTicker {
        export interface StoreModel {
            tickers: Record<string, KunaV3Ticker>;
            lastUpdate?: string;

            usdCalculator: UsdCalculator;

            fetchTickers(): Promise<void>;

            getTicker(marketSymbol: string): KunaV3Ticker | undefined;
        }

        export type WithTickerProps = {
            Ticker: StoreModel,
        };
    }

    namespace MobxUser {
        export interface StoreModel {
            userId?: string;
        }

        export type WithUserProps = {
            User: StoreModel,
        };
    }
}

export {};
