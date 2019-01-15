import { KunaV3Ticker } from 'kuna-sdk';
import { UsdCalculator } from 'utils/currency-rate';

declare global {
    export namespace mobx {
        type Store
            = usdrate.WithUsdRateProps
            & ticker.WithTickerProps
            & user.WithUserProps
            & kunacode.WithKunaCodeProps;

        /**
         * Mobx model for control USD to UAH rate.
         */
        namespace usdrate {
            interface StoreModel {
                rate: number;
                lastUpdate?: string;

                updateUsdRate(): Promise<number>;
            }

            type WithUsdRateProps = {
                UsdRate: StoreModel,
            };
        }


        /**
         * This model helps us to track Ticker list
         */
        namespace ticker {
            interface StoreModel {
                tickers: Record<string, KunaV3Ticker>;
                lastUpdate?: string;

                usdCalculator: UsdCalculator;

                fetchTickers(): Promise<void>;

                getTicker(marketSymbol: string): KunaV3Ticker | undefined;
            }

            type WithTickerProps = {
                Ticker: StoreModel,
            };
        }

        /**
         * Mobx User
         */
        namespace user {
            interface StoreModel {
                userId?: string;
            }

            type WithUserProps = {
                User: StoreModel,
            };
        }


        namespace kunacode {
            type UserOffer = {
                security_token: string;
                offer: kunacodes.Offer;
            };

            interface StoreModel {
                offers: kunacodes.Offer[]

                myOffer: UserOffer[];

                fetchOffers(): Promise<kunacodes.Offer[]>;
            }

            type WithKunaCodeProps = {
                KunaCode: StoreModel,
            };
        }
    }
}

export {};
