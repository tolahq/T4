function round(value: number | bigint, decimalPlaces: number) {
  return Number(
    Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces,
  );
}

function amountInCentsToDecimals(amount: number | BigInt): number {
  return round(Number(amount) / 100, 2);
}

export function toCurrencyString(amount: BigInt | number | null): string {
  // Important to do explicit `null`-check here as `0` is a falsy value
  if (amount === null) {
    return '';
  }
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(amountInCentsToDecimals(amount));
}

export function toDateString(v: Date | null | undefined): string {
  if (!v) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US').format(v);
}

export default {
  currency: toCurrencyString,
  date: toDateString,
};
