const qualityLevels = [
  {
    quality: 'Normal',
    itemPowerModifier: '+ 0 item power',
    chances: {
      good: '80%',
      outstanding: '15%',
      excellent: '5%',
    },
  },
  {
    quality: 'Good',
    itemPowerModifier: '+ 20 item power',
    chances: {
      good: '30%',
      outstanding: '60%',
      excellent: '9.9%',
    },
  },
  {
    quality: 'Outstanding',
    itemPowerModifier: '+ 40 item power',
    normalRerollChance: '15%',
    chances: {
      outstanding: '50%',
      excellent: '49.9%',
    },
  },
];

const quality = {
  normal: 1,
  good: 1.25,
  outstanding: 1.5,
  excellent: 6.25,
};
const globaldiscount = 0;
const itemValue = 6016;

function rerollCost(
  itemValue: number,
  qualityConstante: number,
  globaldiscount: number
) {
  Math.ceil(itemValue * 4.400017 * qualityConstante) *
    (1 - globaldiscount / 100);
}

console.log(rerollCost(itemValue, quality.normal, globaldiscount));
