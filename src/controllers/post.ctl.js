const { addPost, listPosts, getPost } = require("../routes/post.routes");

const { v4: uuidv4 } = require('uuid');
uuidv4();

const path = require("path"); 

const redirectNewPostPageController = async (req, res) => {
    
    res.render("create");
}
const createNewPostController
 = async (req, res) => {
    const{title, body} = req.body;
    try{
            const image = req.files.image;

            const imageName = `${uuidv4()}-${image.name}`;
        
    console.log("image:", image);
       
        image.mv(path.resolve(__dirname, "../../public/upload", imageName));
        
        const newPost = await addPost(title, body, imageName);

        res.redirect(`/post/${newPost.id}`);

    } catch (error){
        res.status(400).json({
            status: "error",
            error
        });
    }
}

const listPostsController = async (req, res) => {
    const posts = await listPosts();

    res.render("index", {
        posts: posts,
    });
}

const getPostbyIdController = async (req, res) => {
    const postId = req.params.id;

    const post = await getPost(postId);

    res.render("post",{
        post: post,
    });
}

module.exports = {
    redirectNewPostPageController,
    createNewPostController,
    listPostsController,
    getPostbyIdController,
}