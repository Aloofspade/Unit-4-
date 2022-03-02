
const { getProfile, getUserPosts, getFollowers, getFollowing, followUser, unFollowUser } = require("../controllers/profile")

const router = require("express").Router()

router.route('/:username').get(getProfile)
router.route("/posts/:username").get(getUserPosts)
router.route('/followers/:userId').get(getFollowers);
router.route('/following/:userId').get(getFollowing);
router.route('/follow/:userToFollowId').post(followUser);
router.route('/unfollow/:userToUnfollowId').post(unFollowUser);



module.exports = router;