const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const { protect, seller } = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const {hitCache} = require('../middlewares/redis')
// const upload = require('../middlewares/upload')

// const {hitCache, clearCache} = require('../middlewares/redis')
// const {stock} = require('../middlewares/middle')

router.get('/', hitCache, productController.getData)
router.get('/:id', hitCache, productController.getDetailData)
router.post('/', protect, seller, upload.single('photo'), productController.insertProduct)
router.put('/:id', protect, seller, productController.update)
router.delete('/:id', protect, seller, productController.delete)

module.exports = router