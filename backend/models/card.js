const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, { require_protocol: true });
      },
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
    required: true,
  },

  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
