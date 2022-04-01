const router = require('express').Router();
const { profileUpdateValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', profileUpdateValidation, updateUser);

module.exports = router;
