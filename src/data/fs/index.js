import shopcategories from './shopcategories.json' assert { type: 'json' };
import source from './items.json' assert { type: 'json' };
import fs from 'fs';

function transformCategories(categories) {
  const transformed = { shop: {} };
  categories.shopcategories.forEach(category => {
    transformed.shop[category.id] = {};
    category.shopsubcategory.forEach(subcategory => {
      transformed.shop[category.id][subcategory.id] = getItems(
        translateCategoryFromShopToSource(category.id),
        subcategory.id
      );
    });
  });
  return transformed;
}

function translateCategoryFromShopToSource(category) {
  let categorySource = '';
  const weaponCategories = ['melee', 'magic', 'ranged', 'tools'];
  const resourceCategories = [
    'resources',
    'cityresources',
    'artefacts',
    'essence',
    'materials',
    'products',
    'luxurygoods',
    'trophies',
    'furniture',
    'token',
    'labourers',
    'other',
  ];
  const farmablesCategories = ['farmables'];
  const equipmentCategories = [
    'armor',
    'accessories',
    'offhand',
    'gatherergear',
  ];

  if (weaponCategories.includes(category)) {
    categorySource = 'weapon';
  } else if (category === 'consumables') {
    categorySource = 'consumableitem';
  } else if (category === 'mounts') {
    categorySource = 'mount';
  } else if (category === 'skillbooks') {
    categorySource = 'consumablefrominventoryitem';
  } else if (resourceCategories.includes(category)) {
    categorySource = 'simpleitem';
  } else if (farmablesCategories.includes(category)) {
    categorySource = 'farmableitem';
  } else if (equipmentCategories.includes(category)) {
    categorySource = 'equipmentitem';
  }
  return categorySource;
}

function getItems(categorySource, sub_category) {
  if (!categorySource) return false;
  const items = source.items[categorySource]
    .filter(
      item =>
        item['@shopsubcategory1'] === sub_category &&
        !item['@uniquename'].includes('VANITY') &&
        !item['@uniquename'].includes('UNIQUE') &&
        !item['@uniquename'].includes('HIDDEN')
    )
    .map(x => x['@uniquename'].replace(/T[1-8]_/, ''));
  return [...new Set(items)];
}

const transformedCategories = transformCategories(shopcategories);

fs.writeFileSync(
  '/Users/franz/Documents/dev/git/ao_manager/src/data/fs/shop.json',
  JSON.stringify(transformedCategories, null, 2)
);
