const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const { jwtSign } = require('../utils/jwt');
const EmailBusyError = require('../errors/emailBusyError');
const ValidationError = require('../errors/validationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user);

      return res
        .send({ token });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else if (err.code === 11000) {
        next(new EmailBusyError());
      } else {
        next(err);
      }
    });
};

module.exports.getMe = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateMe = async (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;

  try {
    let user = await User.exists({ email });
    if (user) {
      throw new EmailBusyError();
    }

    user = await User.findByIdAndUpdate(
      id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );

    res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  }
};
