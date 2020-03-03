const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
      }
    }
  ],
  comments: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
