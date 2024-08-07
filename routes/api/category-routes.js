const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    const categoriesWithProducts = await Promise.all(categories.map(async (category) => {
      // get all products with the matching category_id
      const products = await Product.findAll({ where: { category_id: category.id } });
      return {
        id: category.id,
        category_name: category.category_name,
        products: products
      };
    }));
    // send back all categories with product ids
    res.status(200).json(categoriesWithProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value and include its associated Products
    const category = await Category.findByPk(req.params.id);
    // get all products with the matching category_id
    const products = await Product.findAll({ where: { category_id: category.id } });
    // create a new object with the category information and product ids
    const categoryWithProducts = {
      id: category.id,
      category_name: category.category_name,
      products: products
    };
    // send back the category with product ids
    res.status(200).json(categoryWithProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}).then((category) => {
    // send back the new category
    res.status(200).json(category); 
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}}).then((rowsUpdated) => {
    // send back the number of rows updated
    res.status(200).json(rowsUpdated[0])
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category and associated products by its `id` value
  Product.destroy({where: {category_id: req.params.id}}).then(() => {
    Category.destroy({where: {id: req.params.id}}).then((rowsDeleted) => {
      // send back the number of rows deleted
      res.status(200).json(rowsDeleted);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;

