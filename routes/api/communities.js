const express = require("express");
const fs = require("fs");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Community = require("../../models/Community");

const jsimg = "../html.png";

// @route    POST api/communities
// @desc     Get communities
// @access   Public
router.get("/", async (req, res) => {
  try {
    const communities = await Community.find().sort({ date: -1 });
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/communities/lanking
// @desc     Get community lanking list
// @access   Public
router.get("/lanking", async (req, res) => {
  try {
    const communities = await Community.find().sort({ date: -1 });
    communities.sort(function (a, b) {
      return b.followers.length - a.followers.length;
    });
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/communities/suggestions
// @desc     Get community suggestion
// @access   Public
router.get("/suggestions", async (req, res) => {
  try {
    const communities = await Community.find().select("-posts -followers");
    const inputValue = req.query.q;
    const inputLength = inputValue.length;

    const suggestions =
      inputLength === 0
        ? []
        : communities.filter(
            (community) =>
              community.name.toLowerCase().slice(0, inputLength) === inputValue
          );

    res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/communities/:id
// @desc     Get community
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id, {
      posts: { $slice: [Number(req.query.skip), 3] },
    }).populate("posts.post", ["name", "title", "likes", "user"]);

    const tmp = await Community.findById(req.params.id).populate("posts.post");
    const postsLength = tmp.posts.length;

    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }

    res.json({ community: community, postsLength: postsLength });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    POST api/communities/create
// @desc     Create a community
// @access   Private
router.post(
  "/create",
  [auth, [check("name", "Name is required").not().isEmpty()]],
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
          contentType: "img/png",
        },
      });

      const community = await newCommunity.save();

      res.json(community);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    api/communities/follow/:id
// @desc     Follow a community
// @access   Private
router.put("/follow/:id", auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    // Check if the post has already been liked
    if (
      community.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "The user already has followed" });
    }

    community.followers.unshift({ user: req.user.id });

    await community.save();

    res.json(community.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/communities/unfollow/:id
// @desc     Unfollow a community
// @access   Private
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    // Check if the post has already been liked
    if (
      community.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "The user has not yet been following" });
    }

    // Get remove index
    const removeIndex = community.followers
      .map((follower) => follower.user.toString())
      .indexOf(req.user.id);

    community.followers.splice(removeIndex, 1);

    await community.save();

    res.json(community.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
