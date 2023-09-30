const {getallProduct, uploadProduct} = require('../controller/productController');
const router = require('express').Router();


router.route('/').get(getallProduct).post(uploadProduct)
// router.route('/:productId').get(getaProduct)
// router.route('/')


module.exports = router