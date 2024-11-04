export function profit(
  rate: number,
  fee: number,
  itemPrice: number,
  ressourcePrice: number,
  ressourceQty: number,
  qty: number = 1
) {
  if (itemPrice <= 0 || ressourcePrice <= 0 || ressourceQty <= 0) {
    return 0;
  }
  const itemSold = fees(fee, itemPrice * qty);
  const itemCost = cost(rate, fee, ressourcePrice, ressourceQty, qty);
  const compute = itemSold - itemCost;
  return parseFloat(compute.toFixed(2));
}

export function gain(
  rate: number,
  fee: number,
  itemPrice: number,
  ressourcePrice: number,
  ressourceQty: number,
  qty: number = 1
): number {
  if (itemPrice <= 0 || ressourcePrice <= 0 || ressourceQty <= 0) {
    return 0;
  }
  const itemCost = cost(rate, fee, ressourcePrice, ressourceQty, qty);
  const itemSold = fees(fee, itemPrice * qty);
  const evolution = ((itemSold - itemCost) / itemCost) * 100;
  return parseFloat(evolution.toFixed(2));
}

export function cost(
  rate: number,
  fee: number,
  ressourcePrice: number,
  ressourceQty: number,
  qty: number = 1
): number {
  if (ressourcePrice <= 0 || ressourceQty <= 0) {
    return 0;
  }
  const cost = rateQuantity(rate, ressourceQty, qty) * ressourcePrice + 10040;
  const modulo = moduloQuantity(rate, ressourceQty, qty) * ressourcePrice;
  const compute = cost - fees(fee, modulo);
  return parseFloat(compute.toFixed(2));
}

export function rateQuantity(
  rate: number,
  ressourceQty: number,
  qty: number = 1
) {
  const compute = rrr(rate, (qty - 1) * ressourceQty) + ressourceQty;
  return Math.ceil(compute);
}

export function moduloQuantity(
  rate: number,
  ressourceQty: number,
  qty: number = 1
) {
  const compute =
    rrrModulo(rate, (qty - 1) * ressourceQty) + rrrModulo(rate, ressourceQty);
  return Math.ceil(compute);
}

export function rrr(rate: number, craft: number) {
  rate = 1 - rate / 100;
  const compute = craft * rate;
  return Math.round(compute * 100) / 100;
}

export function rrrModulo(rate: number, craft: number) {
  rate = 1 - rate / 100;
  const compute = craft % rate;
  return Math.round(compute * 100) / 100;
}

export function fees(rate: number, craft: number): number {
  rate = 1 - rate / 100;
  const compute = craft * rate;
  return Math.round(compute * 100) / 100;
}

export function spreadNumber(number: number) {
  return number.toLocaleString('fr-FR', { useGrouping: true });
}

function rerollCost(
  itemValue: number,
  quality: 'normal' | 'good' | 'outstanding' | 'excellent',
  globaldiscount: number
) {
  const rerollRate = {
    normal: 1,
    good: 1.25,
    outstanding: 1.5,
    excellent: 6.25,
  };
  return (
    Math.ceil(itemValue * 4.400017 * rerollRate[quality]) *
    (1 - globaldiscount / 100)
  );
}

console.log(rerollCost(itemValue, 'normal', globaldiscount));
