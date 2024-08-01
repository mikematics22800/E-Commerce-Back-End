const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    const tagsWithProducts = await Promise.all(tags.map(async (tag) => {
      // get all products with the matching tag id
      const productTags = await ProductTag.findAll({where: {tag_id: tag.id}});
      // get array of product ids
      const productIds = productTags.map((product) => product.product_id);
      return {
        id: tag.id,
        tag_name: tag.tag_name,
        productIds: productIds
      }
    }))
    // send back all tags with product ids
    res.status(200).json(tagsWithProducts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one tag by its `id` value
    const tag = await Tag.findByPk(req.params.id);
    // get all products with the matching tag id
    const productTags = await ProductTag.findAll({where: {tag_id: tag.id}});
    // get array of product ids
    const productIds = productTags.map((product) => product.product_id);
    // create a new object with the tag information and product ids
    const tagWithProducts = {
      id: tag.id,
      tag_name: tag.tag_name,
      productIds: productIds
    }
    // send back the tag with product ids
    res.status(200).json(tagWithProducts);
  } catch {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
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
  Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}}).then((rowsUpdated) => {
    res.status(200).json(rowsUpdated[0]);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}}).then((rowsDeleted) => {
    res.status(200).json(rowsDeleted)
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
