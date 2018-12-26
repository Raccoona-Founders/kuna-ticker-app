const precisionMap: Record<string, number[]> = {
    default: [0.01, 0.05, 0.1, 0.5, 1, 5, 10, 50, 100],

    btcuah: [10, 50, 100, 250, 500, 1000],
    ethuah: [10, 50, 100, 250, 500],
    dashuah: [10, 50, 100, 250, 500],
    xrpuah: [0.05, 0.1, 0.5, 1, 2.5, 5],
    ltcuah: [5, 10, 50, 100],
    eosuah: [0.1, 0.5, 1, 5, 10],
    krbuah: [0.1, 0.25, 0.5, 0.75, 1],
    xemuah: [0.1, 0.25, 0.5, 0.75, 1],
    wavesuah: [5, 10, 25, 50],
};

const defaultPrecMap: Record<string, number[]> = {
    default: [0.01, 0.05, 0.1, 0.5, 1, 5, 10, 50, 100],
    UAH: [10, 25, 50, 75, 100],
    BTC: [0.00001, 0.00005, 0.0001, 0.0005, 0.001, 0.005],
};

export default (symbol: string, fallback: string): number[] => {
    return precisionMap[symbol] || defaultPrecMap[fallback] || defaultPrecMap['default']
};
