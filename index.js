const express = require("express");
require("ejs"); // Important
const mongoose = require ("mongoose");
const { 
    addPost,
    listPosts,
    getPost } = require("./src/routes/post.routes");

    const fileUpload = require("express-fileupload");
const path = require("path");   

const app = express();

const { v4: uuidv4 } = require('uuid');
uuidv4();

// Set template engine
app.set("view engine", "ejs");

// Connect mongoDB

try {
    mongoose.connect("mongodb://localhost:27017/test");
    console.log("Connected to MongoDB!");
} catch (error) {
    console.log("Cannot connect MongoDB", error);
}

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Đăng ký thư mục public
app.use(express.static("public"));

//use fileuplode,allow to store file
app.use(fileUpload());

app.get("/posts/new", async (req, res) => {
    
    res.render("create");
});

app.post("/posts/store", async (req, res) => {
    const{title, body} = req.body;
    const image = req.files.image;
    const imageName = `${uuidv4()}-${image.name}`
        
    console.log("image:", image);
    
    try{
        image.mv(path.resolve(__dirname, "public/upload", imageName));
        
        const newPost = await addPost(title, body, imageName);


        res.redirect(`/post/${newPost.id}`);

    } catch (error){
        res.status(400).json({
            status: "error",
            error
        });
    }
});

app.get("/", async (req, res) => {
    const posts = await listPosts();

    res.render("index", {
        posts: posts,
    })
});

app.get("/posts", async (req, res) => {
    const posts = await listPosts();

    res.status(200).json({
        status: "success",
        data: posts,
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/post/:id", async (req, res) => {
    const postId = req.params.id;

    const post = await getPost(postId);

    res.render("post",{
        post: post,
    });
});

app.listen(5000, () => {
    console.log("Go to http://localhost:5000");
});
