const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then((categories) => {
    res.status(200).json(categories)
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((category) => {
    res.status(200).json(category);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}).then((category) => {
    res.status(200).json(category);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}}).then((rows_affected) => {
    res.status(200).json(rows_affected[0])
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}}).then((rows_affected) => {
    res.status(200).json(rows_affected);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;

