import Numeral from 'numeral';

export function numFormat(num: string | number | Numeral, format?: string): string {
    if (!num) {
        return '--';
    }

    const nValue = Numeral(num);

    if (nValue.value() === 0) {
        return '--';
    }

    return nValue.format(format || '0,0.[00]');
}
