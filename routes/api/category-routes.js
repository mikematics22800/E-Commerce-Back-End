const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then((categories) => {
    res.json(categories)
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/api/categories:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((category) => {
    res.json(category);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.post('/api/categories', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}).then((category) => {
    res.send(`New category "${category.category_name}" created`);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.put('/api/categories:id', (req, res) => {
  // First, find the category to get its original name
  Category.findByPk(req.params.id).then((category) => {
    Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}}).then(() => {
      res.send(`Category "${category.category_name}" changed to "${req.body.category_name}"`);
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/api/categories:id', (req, res) => {
  // First, find the category to get its name before deletion
  Category.findByPk(req.params.id).then((category) => {
    Category.destroy({where: {id: req.params.id}}).then(() => {
      res.send(`Category "${category.category_name}" deleted`);
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;

