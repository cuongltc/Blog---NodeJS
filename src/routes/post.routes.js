const PostModel = require("../models/post.model");

const addPost = async (title, body) => {
    const post = await PostModel.create({
        title,
        body,    
    });
    return post;
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
    getPost,
    updatePost,
    removePost,
}



