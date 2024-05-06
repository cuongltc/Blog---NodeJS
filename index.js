const bodyParser = require("body-parser");
const validateMiddleware = require("./src/middlewares/validate.mdw");
const { redirectNewPostPageController, createNewPostController, listPostsController, getPostbyIdController } = require("./src/controllers/post.ctl");
const { redirectAboutController, redirectContactController } = require("./src/controllers/until.ctl");
const connectMongoDB = require("./src/client/connectMongoDb");
const express = require("express");
require("ejs"); // Important

const { 
    addPost,
    listPosts,
    getPost } = require("./src/routes/post.routes");

const fileUpload = require("express-fileupload");

const app = express();

// Set template engine
app.set("view engine", "ejs");

// Connect mongoDB

connectMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Đăng ký thư mục public
app.use(express.static("public"));

//use fileuplode,allow to store file
app.use(fileUpload());

app.get("/posts/new", redirectNewPostPageController );

app.post("/posts/store", validateMiddleware, createNewPostController);

app.get("/posts", listPostsController);

app.get("/about", redirectAboutController);

app.get("/", listPostsController)

app.get("/contact", redirectContactController);

app.get("/post/:id", getPostbyIdController);

app.listen(5000, () => {
    console.log("Go to http://localhost:5000");
});
