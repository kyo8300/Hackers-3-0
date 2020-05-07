const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

//@route api/profiles/:id
//@desc get user's profile
//@access public
router.get('/:id', async (req, res) => {
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

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route api/profiles/topsort/:id
//@desc get user's sorted top posts
//@access public
router.get('/topsort/:id', async (req, res) => {
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

    profile.posts.sort(function (a, b) {
      return b.post.likes.length - a.post.likes.length;
    });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route api/profiles/oldcommentssort/:id
//@desc get user's sorted top comments
//@access public
router.get('/oldcommentssort/:id', async (req, res) => {
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

    profile.comments.sort(function (a, b) {
      return a.date - b.date;
    });

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
