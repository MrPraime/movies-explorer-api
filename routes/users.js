const router = require('express').Router();
const { profileUpdateValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', profileUpdateValidation, updateUser);

module.exports = router;
