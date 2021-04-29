const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../model/Post");
const Profile = require("../../model/Profile");

// validation
const validatePostInput = require("../../validator/post");

// @route   GET api/posts/test
// @des     Test post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts work" });
});

// @route   GET api/posts
// @des     Get posts
// @access  Public

router.get("/", (req, res) => {
  Post.find()
    // sort by date
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @des     Get posts by id
// @access  Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("users", ["name", "avatar"])
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found by this ID" })
    );
});

// @route   POST api/posts
// @des     create post
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.status(404).json(err));
  }
);

// @route   Delete api/posts/:id
// @des     Delete post
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // check post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) => res.status(404).json({ nopost: "Post not found" }));
    });
  }
);

// @route   Post api/posts/like/:id
// @des     like post
// @access  Private

router.put(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status(400).json({ userliked: "User already liked it" });
          }

          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ nopost: "Post not found" }));
    });
  }
);

// @route   Delete api/posts/unlike/:id
// @des     unlike post
// @access  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // splice out array

          post.likes.splice(removeIndex, 1);

          // save

          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ nopost: "Post not found" }));
    });
  }
);

// @route   POST api/posts/comment/:id(post id)
// @des     add comment
// @access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comment array

        post.comments.unshift(newComment);

        // save

        post.save().then((post) => res.json(post));
      })
      .catch(() => res.status(404).json({ nopost: "Post not found" }));
  }
);

// @route   Delete api/posts/comment/:id/:comment_id
// @des     delete comment
// @access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "comment doesnt exist" });
        }

        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch(() => res.status(404).json({ nocomment: "comment not found" }));
  }
);

module.exports = router;
