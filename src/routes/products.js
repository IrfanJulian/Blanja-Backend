const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const { protect, seller } = require('../middlewares/auth')
const upload = require('../middlewares/upload')

// const {hitCache, clearCache} = require('../middlewares/redis')
// const {stock} = require('../middlewares/middle')

router.get('/', productController.getData)
router.get('/:id', productController.getDetailData)
router.post('/', protect, seller, upload.fields([{ name: 'photo', maxCount: 4 }]), productController.insertProduct)
router.put('/:id', protect, seller, upload.single('photo'), productController.update)
router.delete('/:id', protect, seller, productController.delete)

module.exports = router