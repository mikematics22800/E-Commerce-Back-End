const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((categories) => {
    res.status(200).json(categories)
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id).then((tag) => {
    res.status(200).json(tag)
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({tag_name: req.body.tag_name}).then((tag) => {
    res.status(200).json(tag);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}}).then((rows_affected) => {
    res.status(200).json(rows_affected[0]);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}}).then((rows_affected) => {
    res.status(200).json(rows_affected)
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
