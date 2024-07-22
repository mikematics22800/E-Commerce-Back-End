const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/api/tags', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((categories) => {
    res.json(categories)
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/api/tags:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id).then((tag) => {
    res.json(tag)
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.post('/api/tags', (req, res) => {
  // create a new tag
  Tag.create({tag_name: req.body.tag_name}).then((tag) => {
    res.send(`New tag "${tag.tag_name}" created`);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.put('/api/tags:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id).then((tag) => {
    Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}}).then(() => {
      res.send(`Tag "${tag.tag_name}" changed to "${req.body.tag_name}"`);
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/api/tags:id', (req, res) => {
   // First, find the tag to get its name before deletion
   Tag.findByPk(req.params.id).then((tag) => {
    // Then, delete the tag
    Tag.destroy({where: {id: req.params.id}}).then(() => {
      res.send(`Tag "${tag.tag_name}" deleted`);
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
