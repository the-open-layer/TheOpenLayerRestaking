import Big, { BigSource } from 'big.js';

Big.DP = 20;

const buildMap = () => {
  const parts = formatToParts(100000.123);
  const partMap: Record<string, string> = {};

  parts.forEach((part) => {
    if (['group', 'decimal'].includes(part.type)) {
      partMap[part.type] = part.value;
    }
  });
  return partMap;
};

export const getFinalDecimal = (numberString: string): string => {
  const parts = numberString.split(partMap.decimal);

  return parts.length === 2 && parts[1] === '' ? partMap.decimal : '';
};

export const formatToParts = (num: number): Intl.NumberFormatPart[] => {
  return formatter.formatToParts(num);
};

const formatter = Intl.NumberFormat(undefined, { minimumFractionDigits: 10 });
const partMap = buildMap();

export const fromDecimals = (n: BigSource, decimals: number) => {
  return Big(n).div(10 ** decimals);
};

export const fromNano = (n: BigSource) => {
  return Big(n).div(1000000000);
};

export const clamp = (min?: BigSource, value?: Big, max?: BigSource): Big => {
  if (value === undefined) {
    return Big(0);
  }

  if (min !== undefined && value.lt(min)) {
    return Big(min);
  }

  if (max !== undefined && value.gt(max)) {
    return Big(max);
  }

  return value;
};

export type CurrencySymbol = {
  prefix?: string;
  suffix?: string;
  tonSuffix?: string;
};

type WordForms = [string, string];

const inflect = (n: number, forms: WordForms, full?: boolean) => {
  const n100 = n % 100;

  if (!full) {
    forms = forms.map((x) => x[0]) as WordForms;
  }

  if (n100 >= 10 && n100 <= 20) {
    return forms[1];
  }

  n %= 10;

  if (n === 1) {
    return forms[0];
  }

  return forms[1];
};

const timePeriods = [86400, 3600, 60, 1];
const timePeriodNames: WordForms[] = [
  ['day', 'days'],
  ['hour', 'hours'],
  ['minute', 'minutes'],
  ['second', 'seconds'],
];

export const formatTime = (seconds: number, full?: boolean) => {
  let i = 0;

  for (; i < timePeriods.length; i++) {
    if (seconds > timePeriods[i]) {
      break;
    }
  }

  if (i === timePeriods.length) {
    i--;
  }

  const result: string[] = timePeriods
    .map((p, i) =>
      Math.floor((!i ? seconds : seconds % timePeriods[i - 1]) / p)
    )
    .map((x, i) => [
      x,
      [x, inflect(x, timePeriodNames[i], full)].join(full ? ' ' : ''),
    ])
    .filter((x) => x[0] !== 0)
    .map((x) => x[1] as string);

  return result.join(' ');
};

export function formatNumber(value: number | string) {
  return Intl.NumberFormat('en-US', {
    notation: 'standard',
  }).format(Number(value));
}

export function formatImpact(value: number | string) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
  }).format(Number(value));
}
