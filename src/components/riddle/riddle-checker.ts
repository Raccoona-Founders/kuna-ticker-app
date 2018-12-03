import { sumBy } from 'lodash';
import RiddleConfig, { Riddle } from 'components/riddle/riddle-config';
import sjcl from 'sjcl';

export default class RiddleChecker {
    private checkCounter: number = 3;
    private checkLimitTimeout: number = 60 * 1000;

    private checkStream: number[] = [];

    public async getPrize(riddle: Riddle, answer: string): Promise<string> {
        if (answer.length < 1) {
            throw new Error('no_answer');
        }

        const time = new Date().getTime();
        if (this.isLimitExist()) {
            throw new Error('to_many_request');
        }

        this.checkStream.push(time);

        const hash = sjcl.hash.sha256.hash(answer + RiddleConfig.salt);

        if (sjcl.codec.hex.fromBits(hash).toUpperCase() !== riddle.answer_sha256) {
            throw new Error('invalid_answer');
        }

        return sjcl.decrypt(answer + RiddleConfig.prize_salt, JSON.stringify(riddle.prize));
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
