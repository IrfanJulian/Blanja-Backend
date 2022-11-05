const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const { admin } = require('../middlewares/auth')
// const {hitCache} = require('../middlewares/redis')

router.get('/', categoryController.get)
router.post('/', admin, categoryController.insert)
router.put('/:id', admin, categoryController.update)
router.delete('/:id', admin, categoryController.deleteData)

module.exports = router