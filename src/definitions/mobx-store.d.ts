import { KunaV3ExchangeRate, KunaV3Ticker } from 'kuna-sdk';
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
            interface TickerModel {
                tickers: Record<string, KunaV3Ticker>;
                exchangeRates: KunaV3ExchangeRate[];
                favorite: FavoriteModel;
                lastUpdate?: string;

                usdCalculator: UsdCalculator;

                fetchTickers(): Promise<void>;

                getFavorite(): KunaV3Ticker[];

                getTicker(marketSymbol: string): KunaV3Ticker | undefined;

                getMarketVolume(): Numeral;
            }

            interface FavoriteModel {
                exists(marketSymbol: string): boolean;

                add(marketSymbol: string): void;

                remove(marketSymbol: string): void;

                getList(): string[];

                setList(marketSymbols: string[]): void;
            }

            type WithTickerProps = {
                Ticker: TickerModel,
            };
        }

        /**
         * Mobx User
         */
        namespace user {
            interface UserModel {
                userId?: string;
                telegram?: string;
                displayName?: string;

                setDisplayName(name: string): void;

                setTelegram(telegram: string): void;
            }

            type WithUserProps = {
                User: UserModel,
            };
        }


        namespace kunacode {
            type UserOffer = {
                offerId: string;
                securityToken: string;
            };

            type BankType = 'mono' | 'private' | 'other';

            type TelegramOffer = {
                id: number;
                token: string;
                sum: number;
                partial?: number;
                price: number;
                percent: number;
                bank: BankType;
                bankName: string;
                currency: string;
                description: string;
            };

            interface StoreModel {
                offers: kunacodes.Offer[];

                telegramOffers: TelegramOffer[];

                myOffers: UserOffer[];

                sortedOffers: kunacodes.Offer[];

                checkUserReady(): void;

                isMyOffer(offerId: string): boolean;

                fetchOffers(): Promise<kunacodes.Offer[]>;

                fetchTelegramOffers(): Promise<TelegramOffer[]>;

                createOffer(offer: kunacodes.RawOffer): Promise<string>;

                deleteOffer(offerId: string): Promise<void>;
            }

            type WithKunaCodeProps = {
                KunaCode: StoreModel,
            };
        }
    }
}

export {};
