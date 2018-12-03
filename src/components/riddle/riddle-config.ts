export type Riddle = {
    story: string;
    question: string;
    prize_prefix: string;
    answer: string;
    answer_md5: string;
    prize: string;
};

export type TRiddleConfig = {
    salt: string;
    prize_salt: string;
    riddles: Riddle[];
};

let riddleConfig = {
    salt: '',
    prize_salt: '',
    riddles: [],
};

try {
    riddleConfig = require('./riddle.json');
} catch (error) {
    console.warn('Not found ./riddle.json file. Use default.');
}

export default riddleConfig;