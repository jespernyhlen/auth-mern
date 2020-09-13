const express = require('express');
const router = express.Router();

const { authenticate, authenticateAdmin } = require('../middlewares/auth');
const { readUser, readUsers, updateUser } = require('../controllers/user');

router.get('/user/:id', authenticate, readUser);
router.get('/users', authenticate, readUsers);

router.put('/user/update', authenticate, updateUser);
router.put('/admin/update', authenticate, authenticateAdmin, updateUser);

module.exports = router;
