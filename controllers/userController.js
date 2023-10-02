const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc regiser user
//@route /api/users/register
//@acess public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username, !email, !password) {
        res.status(400);
        throw new Error("All fields are mandatory.")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already registered.");
    }

    const hasedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hasedPass
    });

    console.log(`User created ${user}`);
    if(user) {
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid.");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.send(400);
        throw new Error("All fields are mandatory.");
    }

    const user = await User.findOne({email});

    //compare password with the body password.
    if(user && await bcrypt.compare(password, user.password)) {
        const accesToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        );
        res.status(200).json({accesToken});
    } else {
        res.send(401);
        throw new Error("Email or password is not correct.");
    }
    res.json({message: 'Login Successfully.'});
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
