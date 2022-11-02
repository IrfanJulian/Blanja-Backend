const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', userController.getData)
router.post('/register', userController.insertData)
router.post('/login', userController.login)
router.put('/:id', userController.updateData)
router.delete('/:id', userController.deleteData)

module.exports = router