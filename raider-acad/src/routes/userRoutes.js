const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/profile/:id', userController.getUser);
router.put('/profile/:id', userController.updateUser);
router.delete('/profile/:id', userController.deleteUser);

module.exports = router;