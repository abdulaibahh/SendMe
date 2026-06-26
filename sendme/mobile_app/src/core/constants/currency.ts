export const CURRENCY_CODE = 'SLE';

export function formatCurrency(amount: number) {
  return `${CURRENCY_CODE} ${amount.toLocaleString('en-SL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
