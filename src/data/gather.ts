/* eslint-disable */
import data from './items.json';
/* eslint-enable */
import source from './source.json';

function getListCategories() {
  source.categories = data.items.shopcategories.shopcategory
    .map(category => category['@id'])
    .sort();
}

function getListSubCategories() {
  return data.items.shopcategories.shopcategory.map(category => {
    return {
      category: category['@id'],
      subcategories: category.shopsubcategory.map(
        subcategory => subcategory['@id']
      ),
    };
  });
}

console.log(getListSubCategories());
