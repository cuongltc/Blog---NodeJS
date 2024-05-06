const mongoose = require ("mongoose");

const connectMongoDB = () =>{
    try {
        mongoose.connect("mongodb://localhost:27017/test");
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log("Cannot connect MongoDB", error);
    }
}

module.exports = connectMongoDB;