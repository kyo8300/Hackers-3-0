const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Community = require("../../models/Community");
const Profile = require("../../models/Profile");

// @route    POST /posts
// @desc     Create a post, push to a community and profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("text", "Text is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text, mycommunity } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");
      const community = await Community.findById(mycommunity);
      const profile = await Profile.findOne({
        user: user,
      });

      const newPost = new Post({
        title: title,
        text: text,
        name: user.name,
        user: req.user.id,
        community: mycommunity,
      });

      const post = await newPost.save();

      //adds this post to community
      community.posts.unshift({ post: post._id });
      await community.save();

      //adds this post to profile
      profile.posts.unshift({ post: post._id });
      await profile.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/posts/edit/:id
// @desc     Edit a post
// @access   Private
router.post(
  "/edit/:id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("text", "Text is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text, mycommunity } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");
      const community = await Community.findById(mycommunity);
      const tmpPost = await Post.findById(req.params.id);
      const postCommunity = await Community.findById(tmpPost.community._id);

      if (postCommunity._id.toString() !== mycommunity) {
        //Get remove index
        const removeIndex = postCommunity.posts
          .map((p) => p.post._id)
          .indexOf(tmpPost._id);

        console.log(removeIndex);
        postCommunity.posts.splice(removeIndex, 1);
        await postCommunity.save();

        community.posts.unshift({ post: tmpPost._id });
        await community.save();
      }

      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title: title,
          text: text,
          name: user.name,
          user: req.user.id,
          community: mycommunity,
        },
        { new: true }
      );

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    get /posts/:skip
// @desc     Get all posts
// @access   Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("community", ["name", "avatar"]);

    // 1 == Sort by new post, 2 == Sort by likes algorithm
    if (Number(req.query.sort) === 1) {
      //Posts
      const tmp = posts.splice(Number(req.query.skip), 3);
      posts.splice(0);
      Array.prototype.push.apply(posts, tmp);
    } else if (Number(req.query.sort) === 2) {
      posts.sort(function (a, b) {
        const now = new Date();
        const aDate = (now - a.date) / (1000 * 60 * 60);
        const bDate = (now - b.date) / (1000 * 60 * 60);

        const aTotalScore = ((a.likes.length - 1) / (aDate + 2)) * 1.8;
        const bTotalScore = ((b.likes.length - 1) / (bDate + 2)) * 1.8;
        return bTotalScore - aTotalScore;
      });
      const tmp = posts.splice(Number(req.query.skip), 3);
      posts.splice(0);
      Array.prototype.push.apply(posts, tmp);
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    get /posts/following/home/:skip
// @desc     Get following posts
// @access   private
router.get("/following/home", auth, async (req, res) => {
  try {
    const followingPosts = [];
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("community", ["name", "avatar", "followers"]);

    posts.filter((post) => {
      post.community.followers.forEach((follower) => {
        if (follower.user == req.user.id) followingPosts.push(post);
      });
    });

    // 1 == Sort by new post, 2 == Sort by likes algorithm
    if (Number(req.query.sort) === 1) {
      //Posts
      const tmp = followingPosts.splice(Number(req.query.skip), 3);
      followingPosts.splice(0);
      Array.prototype.push.apply(followingPosts, tmp);
    } else if (Number(req.query.sort) === 2) {
      followingPosts.sort(function (a, b) {
        const now = new Date();
        const aDate = (now - a.date) / (1000 * 60 * 60);
        const bDate = (now - b.date) / (1000 * 60 * 60);

        const aTotalScore = ((a.likes.length - 1) / (aDate + 2)) * 1.8;
        const bTotalScore = ((b.likes.length - 1) / (bDate + 2)) * 1.8;
        return bTotalScore - aTotalScore;
      });
      const tmp = followingPosts.splice(Number(req.query.skip), 3);
      followingPosts.splice(0);
      Array.prototype.push.apply(followingPosts, tmp);
    }

    // console.log(followingPosts);
    res.json(followingPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/post/:id
// @desc     Get post by ID
// @access   Public
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("community", [
      "name",
      "avatar",
    ]);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    get /posts/search?q=q&skip=skip
// @desc     Get searched posts
// @access   Public
router.get("/posts/search/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("community", ["name", "avatar"]);

    const searchedPost = posts.filter((post) =>
      new RegExp(`^${req.query.q}`, "i").test(post.title)
    );

    const tmp = searchedPost.splice(Number(req.query.skip), 3);
    searchedPost.splice(0);
    Array.prototype.push.apply(searchedPost, tmp);

    res.json(searchedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({
      user: user,
    });
    const post = await Post.findById(req.params.id);
    const community = await Community.findById(post.community._id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    //delete this post to community
    community.posts = community.posts.filter(
      (p) => p.post._id.toString() !== post._id.toString()
    );
    await community.save();

    //delete this post to profile
    profile.posts = profile.posts.filter(
      (p) => p.post._id.toString() !== post._id.toString()
    );
    await profile.save();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/like/:postid/:commentid
// @desc     like a comment
// @access   Private
router.put("/comment/like/:postid/:commentid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);

    const comment = post.comments.filter(
      (comment) => comment._id.toString() === req.params.commentid
    );

    // Check if the post has already been liked
    if (
      comment[0].commentlikes.filter(
        (like) => like.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    comment[0].commentlikes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/dislike/:postid/:commentid
// @desc     dislike a comment
// @access   Private
router.put("/comment/dislike/:postid/:commentid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);

    const comment = post.comments.filter(
      (comment) => comment._id.toString() === req.params.commentid
    );

    // Check if the post has already been liked
    if (
      comment[0].commentlikes.filter(
        (like) => like.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = comment[0].commentlikes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    comment[0].commentlikes.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post and add to profile
// @access   Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const profile = await Profile.findOne({
        user: user,
      });

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      //add comment to profile
      const profileComment = {
        text: req.body.text,
        post: post,
      };
      profile.comments.unshift(profileComment);
      await profile.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
