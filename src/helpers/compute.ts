export function profit(
  itemPrice: number,
  ressourcePrice: number,
  ressourceQty: number,
  rrr: number,
  qty: number = 1
) {
  if (itemPrice <= 0 || ressourcePrice <= 0 || ressourceQty <= 0) {
    return 0;
  }
  return Math.round(
    (itemPrice - ressourceQty * (1 - rrr / 100) * ressourcePrice) * qty
  );
}

export function gain(
  itemPrice: number,
  ressourcePrice: number,
  ressourceQty: number,
  rrr: number
) {
  if (itemPrice <= 0 || ressourcePrice <= 0 || ressourceQty <= 0) {
    return 0;
  }
  let profit = itemPrice - ressourceQty * (1 - rrr / 100) * ressourcePrice;
  let total = itemPrice + profit;
  let evolution = Math.round(((total - itemPrice) / itemPrice) * 100);
  return evolution > 0 ? `+${evolution}%` : `-${evolution}%`;
}

export function cost(
  ressourcePrice: number,
  ressourceQty: number,
  rrr: number
) {
  if (ressourcePrice <= 0 || ressourceQty <= 0) {
    return 0;
  }
  return Math.round(ressourceQty * (1 - rrr / 100) * ressourcePrice);
}
