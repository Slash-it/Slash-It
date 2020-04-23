const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/users', UserController.findAll);
router.post('/users', UserController.addUser);

module.exports = router;