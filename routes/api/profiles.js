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
      user: req.params.id
    })
      .populate('user', ['name', 'date'])
      .populate([
        {
          path: 'posts.post',
          select: 'title likes',
          populate: { path: 'community', select: 'name avatar' }
        }
      ])
      .populate([
        {
          path: 'comments.post',
          select: 'title',
          populate: { path: 'community', select: 'name avatar' }
        }
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

module.exports = router;
