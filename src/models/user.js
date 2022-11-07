const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WrongLoginOrPasswordError = require('../errors/wrongLoginOrPasswordError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new WrongLoginOrPasswordError();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new WrongLoginOrPasswordError();
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
