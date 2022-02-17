const { createPosts, getAllPosts, getPostById, deletePost, likePost, unlikePost,getLikes, createComment, deleteComment } = require('../controllers/posts');


const router = require('express').Router();

router.route('/').post(createPosts).get(getAllPosts)
router.route('/:postId').get(getPostById).delete(deletePost)
router.route("/like/:postId").post(likePost).put(unlikePost).get(getLikes)
router.route("/comment/:postId").post(createComment)
router.route('/comment/:postId/:commentId').delete(deleteComment)


module.exports = router