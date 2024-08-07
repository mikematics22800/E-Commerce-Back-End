const router = require('express').Router();
const { Product, Tag, ProductTag, Category } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const products = await Promise.all(await Product.findAll().map(async (product) => {
      const productTags = await ProductTag.findAll({where: {id: product.id}});
      const category = await Category.findByPk(product.category_id);
      const tags = productTags.map((tag) => tag.tag_id);
      return {
        product_name: product.product_name,
        price: product.price,
        stock: product.stock,
        category: category,
        tag: tags
      }
    }))
    res.status(200).json(products);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
})

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const productTags = await ProductTag.findAll({where: {id: product.id}});
    const category = await Category.findByPk(product.category_id);
    const tags = productTags.map((tag) => tag.tag_id);
    const productData = {
      product_name: product.product_name,
      price: product.price,
      stock: product.stock,
      category: category,
      tags: tags
    }
    res.status(200).json(productData);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product[0]);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete product tag then product by their `id` value
router.delete('/:id', (req, res) => {
  ProductTag.destroy({where: {product_id: req.params.id}}).then(() => {
    Product.destroy({where: {id: req.params.id}}).then((rowsDeleted) => {
      res.status(200).json(rowsDeleted);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });
})

module.exports = router;
