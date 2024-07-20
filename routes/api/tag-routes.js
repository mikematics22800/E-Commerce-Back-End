const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  res.send('All tags:', JSON.stringify(Tag.findAll(), null, 2));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id).then((tag) => {
    if (!tag) {
      return res.status(404).send('Product not found');
    }
    res.send('Product by ID:', JSON.stringify(Tag.findByPk(req.params.id), null, 2));
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({tag_name: req.body.tag_name}).then((tag) => {
    res.send(`New tag ${JSON.stringify(tag, null, 2)} created`);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id).then((tag) => {
    if (!tag) {
      return res.status(404).send('tag not found');
    }
    // Then, update the tag with the new name
    Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}})
      .then(() => {
        res.send(`tag ${tag.tag_name} changed to ${req.body.tag_name}`);
      });
  });
});

router.delete('/:id', (req, res) => {
   // First, find the tag to get its name before deletion
   Tag.findByPk(req.params.id).then((tag) => {
    if (!tag) {
      return res.status(404).send('tag not found');
    }
    // Then, delete the tag
    Tag.destroy({where: {id: req.params.id}}).then(() => {
      res.send(`tag ${tag.tag_name} deleted`);
    });
  });
});

module.exports = router;
