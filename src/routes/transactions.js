const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactions')
const { protect, user } = require('../middlewares/auth')

router.get('/', transactionsController.getData)
router.post('/', protect, user, transactionsController.insert)
router.delete('/:id', transactionsController.delete)
router.put('/:id', transactionsController.update)

module.exports = router