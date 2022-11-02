const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactions')
const { protect } = require('../middlewares/auth')

router.get('/', transactionsController.getData)
router.post('/', protect, transactionsController.insert)
router.delete('/:id', transactionsController.delete)
router.put('/:id', transactionsController.update)

module.exports = router