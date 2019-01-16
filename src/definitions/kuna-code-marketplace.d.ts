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
            amount: number;
            currency: string;
            comment?: string;
            side: 'buy' | 'sell';
            commission: number;
            creation_time: string;
            user: User;
        };
    }
}

export {};
