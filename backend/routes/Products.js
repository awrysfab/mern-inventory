const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(vendors => res.json(vendors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const sku = req.body.sku;
  const name = req.body.name;
  const vendor_name = req.body.vendor_name;
  const price = Number(req.body.price);
  const newProduct = new Product({ sku, name, vendor_name, price });
  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(vendor => res.json(vendor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.sku = req.body.sku;
      product.name = req.body.name; 
      product.vendor_name = req.body.vendor_name;
      product.price = req.body.price;
      product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;