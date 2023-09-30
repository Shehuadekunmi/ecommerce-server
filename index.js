require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const { register } = require("./controller/userController");
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary").v2




// CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// midelware
app.use(express.json());
app.use(fileupload({useTempFiles: true}));
app.use(cors());



// routes
app.use('/api/v1', userRouter)
app.use('/api/v1/product', productRouter)



// dbconnection

const startServer = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB_URL) ;
       app.listen(port, () =>{
        console.log(`server running on port ${port}...`);
       })
    } catch (error) {
        console.log(error);
    }
}
startServer();

app.use((req, res) =>{
    res.status(404).json({msg: 'Resource not found'})
})