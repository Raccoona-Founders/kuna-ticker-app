import numeral from 'numeral';

numeral.register('locale', 'ua', {
    delimiters: {
        thousands: ' ',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number: number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '$'
    }
});

// switch between locales
numeral.locale('ua');