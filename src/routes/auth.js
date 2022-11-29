const router = require('express').Router();
const { createUser, login } = require('../controllers/usres');
const { signUpValidator, signInValidator } = require('../validations/authValidations');

router.post('/signup', signUpValidator, createUser);
router.post('/signin', signInValidator, login);

module.exports = router;
