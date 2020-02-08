const express = require('express');
const fs = require('fs');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Community = require('../../models/Community');

const jsimg = '../html.png';

// @route    POST api/communities
// @desc     Get communities
// @access   Private
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find().sort({ date: -1 });
    res.json(communities);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/communities/create
// @desc     Create a community
// @access   Private
router.post(
  '/create',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCommunity = new Community({
        name: req.body.name,
        avatar: {
          data: fs.readFileSync(jsimg),
          contentType: 'img/png'
        }
      });

      const community = await newCommunity.save();

      res.json(community);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    api/communities/follow/:id
// @desc     Follow a community
// @access   Private
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    // Check if the post has already been liked
    if (
      community.followers.filter(
        follower => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'The user already has followed' });
    }

    community.followers.unshift({ user: req.user.id });

    await community.save();

    res.json(community.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/communities/unfollow/:id
// @desc     Unfollow a community
// @access   Private
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    // Check if the post has already been liked
    if (
      community.followers.filter(
        follower => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'The user has not yet been following' });
    }

    // Get remove index
    const removeIndex = community.followers
      .map(follower => follower.user.toString())
      .indexOf(req.user.id);

    community.followers.splice(removeIndex, 1);

    await community.save();

    res.json(community.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
