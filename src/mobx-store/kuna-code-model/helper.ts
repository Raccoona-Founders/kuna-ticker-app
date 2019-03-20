

function checkBank(bank: string): mobx.kunacode.BankType {
    const parts = bank.split(' ');
    switch (parts[0]) {
        case 'Приват': return 'private';
        case 'Моно': return 'mono';
    }

    return 'other';
}

export default {
    checkBank
};
