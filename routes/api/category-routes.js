const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  res.send('All categories:', JSON.stringify(Category.findAll(), null, 2));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((category) => {
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.send('Category by ID:', JSON.stringify(Category.findByPk(req.params.id), null, 2));
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}).then((category) => {
    res.send(`New category ${JSON.stringify(category, null, 2)} created`);
  })
});

router.put('/:id', (req, res) => {
  // First, find the category to get its original name
  Category.findByPk(req.params.id).then((category) => {
    if (!category) {
      return res.status(404).send('Category not found');
    }
    // Then, update the category with the new name
    Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}})
      .then(() => {
        res.send(`Category ${category.category_name} changed to ${req.body.category_name}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  // First, find the category to get its name before deletion
  Category.findByPk(req.params.id).then((category) => {
    if (!category) {
      return res.status(404).send('Category not found');
    }
    // Then, delete the category
    Category.destroy({where: {id: req.params.id}}).then(() => {
      res.send(`Category ${category.category_name} deleted`);
    });
  });
});

module.exports = router;

