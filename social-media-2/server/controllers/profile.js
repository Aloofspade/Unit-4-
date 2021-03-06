const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModule");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ user: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("user not found");
    }

    const profile = await ProfileModel.findOne({ user: user._id }).populate(
      "user"
    );
    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    return res.status(200).json({
      profile,
      followersLength:
        profileFollowStats.followers.length > 0
          ? profileFollowStats.followers.length
          : 0,
      followingLength:
        profileFollowStats.following.length > 0
          ? profileFollowStats.following.length
          : 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error @ getProfile");
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(404).send("user not found");
    }

    const posts = await PostModel.find({ user: user._id })
      .sort({ createAt: -1 })
      .populate("user")
      .populate("comments.user");

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getUserPosts");
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await FollowerModel.findOne({ user: userId }).populate(
      "followers.user"
    );
    res.status(200).json(user.followers);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getFollowers");
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await FollowerModel.findOne({ user: userId }).populate(
      "following.user"
    );
    res.status(200).json(user.following);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getFollowing");
  }
};

const followUser = async (req, res) => {
  try {
    const { userId } = req;
    const { userToFollowId } = req.params;

    const user = await FollowerModel.findOne({ user: userId });
    const userToFollow = await FollowerModel.findOne({ user: userToFollowId });

    if (!user || !userToFollow) return res.status(404).send("User Not Found");

    const isFollowing = user.following.find(
      (eachUser) => eachUser.user.toString() === userToFollowId
    );

    if (isFollowing) return res.status(401).send("User is already followed");

    await user.following.unshift({ user: userToFollowId });
    await userToFollow.followers.unshift({ user: userId });

    await user.save();
    await userToFollow.save();
    return res.status(200).send("User Followed ");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ followUser");
  }
};
const unFollowUser = async (req, res) => {
  try {
    const { userId } = req;
    const { userToUnfollowId } = req.params;

    const user = await FollowerModel.findOne({
      user: userId,
    });
    const userToUnfollow = await FollowerModel.findOne({
      user: userToUnfollowId,
    });

    if (!user || !userToUnfollow) return res.status(404).send("User Not Found");

    const isFollowingIndex = user.following.findIndex(
      (eachUser) => eachUser.user.toString() === userToUnfollowId
    );

    if (isFollowingIndex === -1)
      return res.status(401).send("User not followed before");

    await user.following.splice(isFollowingIndex, 1);
    await user.save();

    const removeFollowerIndex = userToUnfollow.followers.findIndex(
      (eachUser) => eachUser.user.toString() === userId
    );

    await userToUnfollow.followers.splice(removeFollowerIndex, 1);
    await userToUnfollow.save();

    return res.status(200).send("User Unfollowed ");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error @ unFollowUser");
  }
};
module.exports = {
  getProfile,
  getUserPosts,
  getFollowers,
  followUser,
  unFollowUser,
  getFollowing,
};
