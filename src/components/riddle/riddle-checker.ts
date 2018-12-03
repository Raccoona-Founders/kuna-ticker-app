import { sumBy } from 'lodash';
import { Riddle } from 'components/riddle/riddle-config';

export default class RiddleChecker {
    private checkCounter: number = 3;
    private checkLimitTimeout: number = 60 * 1000;

    private checkStream: number[] = [];

    public async getPrize(riddle: Riddle, answer: string): Promise<string> {
        if (answer.length < 1) {
            throw new Error('Ну хоть что-то введи!');
        }

        const time = new Date().getTime();
        if (false === this.isLimitExist()) {
            throw new Error('Эй, помедленее! Слишком часто отвечаешь.');
        }

        this.checkStream.push(time);

        return riddle.prize;
    }


    private isLimitExist(time?: number): boolean {
        if (!time) {
            time = new Date().getTime();
        }

        const timePoint = time - this.checkLimitTimeout;

        const timeoutCount = sumBy(this.checkStream, (t: number) => t > timePoint ? 1 : 0);

        return timeoutCount >= this.checkCounter;
    }
}
