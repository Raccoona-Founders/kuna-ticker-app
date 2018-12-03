import sjcl from 'sjcl';

export type Riddle = {
    story: string;
    question: string;
    answer_sha256: string;
    prize_prefix: string;
    prize: sjcl.SjclCipherEncrypted;
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