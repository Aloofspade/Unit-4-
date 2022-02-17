const UserModel = require('../models/UserModel')
const uuid = require("uuid").v4
const PostModel = require('../models/PostModel');
const { response } = require('express');

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Create Post 
.post('/')
req.body {text, location, picUrl}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


const createPosts = async (req,res) => {
    const {text, location, picUrl} = req.body;
    if(!text.length)
        return res.status(401).send('text must be a least 1 char long')
        try {
             const newPost = {
                 user: req.userId,
                 text,
             }
             if(location) newPost.location = location
             if(picUrl) newPost.picUrl = picUrl

             const post = await new PostModel(newPost).save();
             const postCreated = await PostModel.findById(post. _id).populate("user")

             return res.status(200).json(postCreated)

        } catch (error) {
            console.log(error);
            return res.status(500).send("Server error on post controller")
        }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET all Posts 
.get('/')
req.query {pageNumber} 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getAllPosts = async (req, res) => {
    const {page} = req.query;
    const pageNumber = Number(page);
    const size = 8;

    try {
        let posts;
        if(pageNumber === 1){
            posts = await PostModel.find()
            .limit(size)
            .sort({createAt: -1})
            .populate("user")
            .populate("comments.user");
        } 
        else {
            const skips = size * (pageNumber - 1)
            posts = await PostModel.find()
            .skip(skips)
            .limit(size)
            .sort({createAt: -1})
            .populate("user")
            .populate("comments.user") 
        }
        return res.status(200).json(posts)

    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error on getAllPosts")
    }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Get Post by ID
.get('/:postId')
req.params: {postId}
~~~~~~~~~~~*/

const getPostById = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.postId)
        .populate("user")
        .populate("comments.user")

        if(!post) 
        return res.status(404).send("Post not found")

        return res.status(200).json(post);
    } catch (error) {
        
        console.log(error);
        return res.status(500).send("Server error at getPostById")
    }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DELETE POST 
.delete('/:postId')
req.params: {postId}

~~~~~~~~~~~*/

const deletePost = async(req, res) => {
    try {
        
        const {userId} = req;
        const {postId} = req.params;

        const post = await PostModel.findById(postId)

        if(!post) 
        return res.status(404).send("Post not found")

        const user = await UserModel.findById(userId)

        if(post.user.toString() !== userId) {
            if (user.role === "role"){
                await post.remove()
                return res.status(200).send("Post Removed")

            } else {
                return res.status(401).send("Unauthorized");
            }
        }

        await post.remove()
        return res.status(200).send("Post Removed")
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error @ deletePost")
    }
}

/*
LIke  a post 
.post('/like/:postId')
req.params {postId}
*/


const likePost = async (req, res) => {
    try {
        const {postId} = req.params 
        const {userId} = req
        const post = await PostModel.findById(postId)
        if(!post) return res.status(403).send(" No Post Found")

        const isLiked = Boolean(post.likes.find(
            (like) => like.user.toString() === userId 
        ));

        if(isLiked) return res.status(401).send("post already liked ")

        await post.likes.unshift({user: userId});
        await post.save();

        return res.status(200).send("Post Liked");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error @ likePosts")
    }
}

/*
Unlike a post 
.put('/like/:postId')
req.params {postId}

*/

const unlikePost = async (req, res) => {
    try {
        const {postId} = req.params
        const {userId} = req;
        const post = await PostModel.findById(postId)

        if(!post) return res.status(403).send("No Post Found ")

        const likeIndex = post.like.findIndex((like)  => {
             like.user.toString() === userId 
            }
        );
        

        if(likeIndex === -1) return res.status(403).send("post not liked ")
       
        await post.likes.splice(likeIndex, 1)
        await post.save()

        return res.status(200).send("Post Unliked")

    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error @ unlikePost")
    }
}

/*

*/

const getLikes = async (req, res) => {
    try {
        const {postId} = req.params
        const post = await PostModel.findById(postId).populate("likes.user")
        if(!post)  return res.status(403).send("Post not found")

        return res.status(200).json(post.likes)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error @ getLikes")
    }
}
/*
Create a comment
.post('/comment/:postId)
req.params {postId}
req.body {text}
*/


const createComment = async (req, res) => {
    try {
        const {postId} = req.params
        const {text} = req.body

        if(!text) {
            return res.status(401).send("Must have at least 1 comment")
        }

        const post = await PostModel.findById(postId)

        if(!post) return res.status(403).send("No Post Found ")

        const newComment = {
            _id: uuid(),
            text,
            user: req.userId,
        };
        await post.comment.unshift(newComment)
        await post.save()

        return res.status(200).json(newComment._id)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error @  createComments")
    }
}

/*
Delete a comment 
.delete('/comments/:postId/:commentId)
req.params {postId, commentId} 
*/

const deleteComment = async (req, res) => {
    try {
        const {postId, commentId} = req.params
        const {userId} = req

        const post = await PostModel.findById(postId)

        if(!post) return res.status(403).send("No Post Found ")

        const comment = post.comments.find((comment) => comment._id === commentId)
        if(!comment) return res.status(403).send("No Comment Found ")

        const user = await UserModel.findById(userId)

        const deleteComment = async () => {
            const indexOf = post.comments
            .map((comment) => comment._id)
                .indexOf(commentId)

                await post.comments.splice(indexOf, 1)
                await post.save();

                return res.status(200).send("Comment Deleted")
        }

        if(comment.user.toString() != userId) {
            if(user.role === "root"){
                await deleteComment()
            } else {
                return res.status(401).send("Unauthorized")
            }
        }


        await deleteComment();
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error @  deleteComment")
    }
}


module.exports = {createPosts, getAllPosts, deletePost, getPostById, likePost, unlikePost, getLikes, createComment, deleteComment}