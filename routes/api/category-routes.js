const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log('All categories:', JSON.stringify(Category.findAll(), null, 2));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log('Category by ID:', JSON.stringify(Category.findByPk(req.params.id), null, 2));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}).then((category) => {
    console.log(`New category ${JSON.stringify(category, null, 2)} created`);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}}).then((category) => {
    console.log(`Category ${req.params.id} name changed to ${req.body.category_name}`);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}}).then((category) => {
    console.log(`Category ${req.params.id} deleted`);
  })
});

module.exports = router;

