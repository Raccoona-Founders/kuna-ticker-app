declare global {
    export namespace kunacodes {
        type User = {
            name: string;
            contact: string;
            avg_rating: number;
            num_of_ratings: number;
        };

        type Offer = {
            id: string;
            side: 'buy' | 'sell';
            amount: number;
            currency: string;
            comment?: string;
            commission: number;
            creation_time: string;
            user: User;
        };


        type RawOffer = {
            side: 'buy' | 'sell';
            amount: number;
            currency: string;
            commission: number;
            comment?: string;
        };

        type RawUser = {
            id: string;
            name: string;
            telegram: string;
        };
    }
}

export {};
