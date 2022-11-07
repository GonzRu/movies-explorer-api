const router = require('express').Router();
const { getMe, updateMe } = require('../controllers/usres');
const { updateMeValidator } = require('../validations/usersValidations');

router.get('/users/me', getMe);
router.patch('/users/me', updateMeValidator, updateMe);

module.exports = router;
