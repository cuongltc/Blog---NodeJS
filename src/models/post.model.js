const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    body: String,

    username: {
        type: String,
    },
    postedAt: {
        type: Date,
        default: new Date(),
    },
    image: {
        type: String,
    }
});

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel;
