import { KunaV3Ticker } from 'kuna-sdk';
import { UsdCalculator } from 'utils/currency-rate';

declare global {
    export type MobxStore
        = MobxUsdRate.WithUsdRateProps
        & MobxTicker.WithTickerProps
        & MobxUser.WithUserProps
        & MobxKunaCode.WithKunaCodeProps;

    /**
     * Mobx model for control USD to UAH rate.
     */
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


    /**
     * This model helps us to track Ticker list
     */
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

    /**
     * Mobx User
     */
    namespace MobxUser {
        export interface StoreModel {
            userId?: string;
        }

        export type WithUserProps = {
            User: StoreModel,
        };
    }


    namespace MobxKunaCode {
        type Offer = {
            token: string;
            amount: number;
            currency: string;
            side: 'sell' | 'buy';
            comment?: string;
            user: {
                name: string;
                telegram: string;
            }
        };

        type UserOffer = Offer & {
            security_token: string;
        };

        export interface StoreModel {
            offers: Offer[];

            myOffer: UserOffer[];

            fetchOffers(): Promise<Offer[]>;
        }

        export type WithKunaCodeProps = {
            KunaCode: StoreModel,
        };
    }
}

export {};
