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
  const itemCost = cost(rate, fee, ressourcePrice, ressourceQty, qty);
  const itemSold = applyFee(fee, itemPrice * qty);
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
  const itemSold = applyFee(fee, itemPrice * qty);
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
  const cost = rateQuantity(rate, ressourceQty, qty) * ressourcePrice;
  const modulo = moduloQuantity(rate, ressourceQty, qty) * ressourcePrice;
  const compute = cost - applyFee(fee, modulo);
  // need to apply fees from craft
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

export function applyFee(rate: number, craft: number): number {
  rate = 1 - rate / 100;
  const compute = craft * rate;
  return Math.round(compute * 100) / 100;
}

export function spreadNumber(number: number) {
  return number.toLocaleString('fr-FR', { useGrouping: true });
}

export function rerollCost(
  itemValue: number,
  quality: 'normal' | 'good' | 'outstanding' | 'excellent',
  globalDiscount: number = 0
): number {
  const baseQualityRate = {
    normal: 1,
    good: 1.25,
    outstanding: 1.5,
    excellent: 6.25,
  };
  const chanceQualityCost = {
    normal: 1,
    good: 1.42,
    outstanding: 2,
    excellent: 20,
  };
  const rate = 1 - globalDiscount / 100;
  const cost =
    itemValue *
    4.400017 *
    baseQualityRate[quality] *
    chanceQualityCost[quality];
  const compute = cost * rate;

  return Math.ceil(compute);
}

export function calculateProbabilities(qualityLevels: number) {
  const rate = qualityLevels / 100;
  const mp = 1 - Math.pow(0.999, rate);
  const ex = 1 - Math.pow(0.989, rate) - mp;
  const ou = 1 - Math.pow(0.95, rate) - ex - mp;
  const go = 1 - Math.pow(0.75, rate) - ou - ex - mp;
  const no = 1 - (go + ou + ex + mp);

  return {
    mp: parseFloat((mp * 100).toFixed(2)),
    ex: parseFloat((ex * 100).toFixed(2)),
    ou: parseFloat((ou * 100).toFixed(2)),
    go: parseFloat((go * 100).toFixed(2)),
    no: parseFloat((no * 100).toFixed(2)),
  };
}

const qualityLevels = [
  {
    quality: 'normal',
    chances: {
      good: 80,
      outstanding: 15,
      excellent: 5,
    },
  },
  {
    quality: 'good',
    chances: {
      good: 30,
      outstanding: 60,
      excellent: 10,
    },
  },
  {
    quality: 'outstanding',
    chances: {
      outstanding: 50,
      excellent: 50,
    },
  },
];
