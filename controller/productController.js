const { default: mongoose } = require('mongoose');
const Product = require('../model/product');
const User = require('../model/product');
const cloudinary = require('cloudinary').v2
const fs = require('fs')


// allproduct

const getallProduct = async (req, res) =>{
    try {
        const products = await Product.find();
        res.status(201).json({success: true, products}) 
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

// singleproduct

// const getaProduct = async (req, res) =>{
//     const {productId} = req.params
//     try {

//         const product = await Product.findById({_Id: productId})
//         res.status(201).json({success: true, product});
//     } catch (error) {
//         res.json(error)
//         console.log(error);
//     }
// };

const uploadProduct = async (req, res) =>{
    const {name, category,  price, description } = req.body
    
    try {
        const result =await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
        folder: 'Ecommerce'
        });
        const imageUrl = result.secure_url;
        fs.unlinkSync(req.files.image.tempFilePath);

        const newProduct = await Product.create({ name, category, image: imageUrl, price, description })
        res.status(201).json({success: true, newProduct })
    } catch (error) {
        res.json(error)
        console.log(error);
    }
}

module.exports = {getallProduct, uploadProduct}