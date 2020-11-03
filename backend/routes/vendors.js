const router = require('express').Router();
let Vendor = require('../models/vendor.model');

router.route('/').get((req, res) => {
  Vendor.find()
    .then(vendors => res.json(vendors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;

  const newVendor = new Vendor({ name, address });

  newVendor.save()
    .then(() => res.json('Vendor added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Vendor.findById(req.params.id)
    .then(vendor => res.json(vendor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Vendor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vendor deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Vendor.findById(req.params.id)
    .then(vendor => {
      vendor.name = req.body.name;
      vendor.location = req.body.location;

      vendor.save()
        .then(() => res.json('Vendor updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;