const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let categories
  Category.findAll().then((response) => {
    categories = res.json(response); 
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });

  categories.forEach((category) => {{}})
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((response) => {
    res.status(200).json(response); // send back the specified category
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}).then((response) => {
    res.status(200).json(response); // send back the new category
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}}).then((response) => {
    res.status(200).json(response[0]) // send back the number of rows updated
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}}).then((response) => {
    res.status(200).json(response); // send back the number of rows deleted
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;

