const express = require('express');
const router= express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register',async (req, res) =>{
    try{
        const {username,email,password} = req.body;
        let exist = await User.findOne({email}).maxTimeMS(15000);
        if(exist){
            return res.status(400).send('User Already Exist')
        }
        //generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//create new user
        let newUser = new User({
            username,
            email,
            password:hashedPassword
        })

		//save user and respond
        await newUser.save();
        res.status(200).json({message: "Registration Successfull",newUser})

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

//LOGIN
router.post('/login',async (req, res) => {
    try{
        const {email,password} = req.body;

		//Find User
        let existingUser = await User.findOne({email}).maxTimeMS(15000);
        if(!existingUser) {
            return res.status(404).json({ message: "Couldn't Find User By This Email" });
        }
		const validPassword = await bcrypt.compare(password, existingUser.password)
        if(!validPassword) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
		return res.status(200).json({ message: "Login Successfull", newUser: existingUser });

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
})

module.exports = router
