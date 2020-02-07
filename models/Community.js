const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    data: Buffer,
    contentType: String
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
      }
    }
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Community = mongoose.model('community', CommunitySchema);
