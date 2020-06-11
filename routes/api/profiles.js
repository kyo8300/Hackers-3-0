const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

//@route api/profiles/:id
//@desc get user's profile
//@access public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne(
      {
        user: req.params.id,
      }
      // { posts: { $slice: [Number(req.query.skip), 3] } }
    )
      .populate('user', ['name', 'date'])
      .populate([
        {
          path: 'posts.post',
          select: 'title likes',
          populate: { path: 'community', select: 'name avatar' },
        },
      ])
      .populate([
        {
          path: 'comments.post',
          select: 'title',
          populate: { path: 'community', select: 'name avatar' },
        },
      ]);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // 1 == Sort by new post, 2 == Sort by Top likes, 3 == Sort by old comments
    if (Number(req.query.sort) === 1) {
      //Posts
      const sortedPosts = profile.posts.splice(Number(req.query.skip), 3);
      profile.posts.splice(0);
      Array.prototype.push.apply(profile.posts, sortedPosts);
    } else if (Number(req.query.sort) === 2) {
      profile.posts.sort(function (a, b) {
        return b.post.likes.length - a.post.likes.length;
      });
      const sortedByLike = profile.posts.splice(Number(req.query.skip), 3);
      profile.posts.splice(0);
      Array.prototype.push.apply(profile.posts, sortedByLike);
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route api/profiles/comments/:id
//@desc get user's comments
//@access public
router.get('/comments/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    })
      .populate('user', ['name', 'date'])
      .populate([
        {
          path: 'posts.post',
          select: 'title likes',
          populate: { path: 'community', select: 'name avatar' },
        },
      ])
      .populate([
        {
          path: 'comments.post',
          select: 'title',
          populate: { path: 'community', select: 'name avatar' },
        },
      ]);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // 1 == Sort by new comments, 2 == Sort by old comments
    if (Number(req.query.sort) === 1) {
      const sortedByNewComments = profile.comments.splice(
        Number(req.query.skip),
        3
      );
      profile.comments.splice(0);
      Array.prototype.push.apply(profile.comments, sortedByNewComments);
    } else if (Number(req.query.sort) === 2) {
      profile.comments.sort(function (a, b) {
        return a.date - b.date;
      });
      const sortedByOldComments = profile.comments.splice(
        Number(req.query.skip),
        3
      );
      profile.comments.splice(0);
      Array.prototype.push.apply(profile.comments, sortedByOldComments);
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
