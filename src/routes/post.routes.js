const PostModel = require("../models/post.model");

const addPost = async (title, body, imageString) => {
    const post = await PostModel.create({
        title,
        body,    
        postedAt: new Date(),
        image: "/upload/" + imageString,
    });
    return post;
};

const listPosts = async () => {
    const posts = await PostModel.find();

    return posts;
};


const getPost = async (id) => {
    const post = await PostModel.findById(id);

    return post;
}

const updatePost = async (id, arg) => {
    const updatePost = await PostModel.findByIdAndUpdate(id, arg,{
        new: true,
    })
} 

const removePost = async (id) => {
    const deletion = await PostModel.findByIdAndDelete(id)

    return deletion;
}

module.exports = {
    addPost,
    listPosts,
    getPost,
    updatePost,
    removePost,
}



