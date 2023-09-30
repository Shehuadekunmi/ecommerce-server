const { Model } = require("mongoose");
const User = require("../model/user");


// Register
const register = async (req, res) =>{
    try {
        const {email} = req.body
        const extingUser = await User.findOne({email})
        if(extingUser){
            return res.status(200).json({msg: 'Email is already exist',  alert: false})
        }
        
        const user = await User.create({...req.body});
        res.status(201).json({success: true, user})
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};


// login

const login = async (req, res) =>{
const {email, password} = req.body;
if(!email || !password){
    return res.status(400).json({success: false, msg: 'Please provide neccessary details'})
};
try {
    const user = await User.findOne({email})
    if(!user) {
        throw Error ('Incorrect user')
    }
    res.status(201).json({success: true})
} catch (error) {
    console.log(error);
    res.status(400).json(error)
}
};

module.exports = { login, register}