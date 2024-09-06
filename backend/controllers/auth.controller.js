import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // must have length of 8 characters, have an uppercase and lowercase letter,\ and a special character
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        console.log('first')
      return res.status(400).json({ success: false, message: "must have length of 8 characters, have an uppercase and lowercase letter, and a special character" });
    }

    const existingUserEmail = await User.findOne({email: email})

    if(existingUserEmail){
        console.log('2')
        return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const existingUserUsername = await User.findOne({username: username})

    if(existingUserUsername){
        console.log(3)
        return res.status(400).json({ success: false, message: "username already exists." });
    }

    const profilePics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
    const image = profilePics[Math.floor(Math.random() * profilePics.length)]

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({email, password: hashedPassword, username, image})
    await newUser.save()

    return res.status(201).json({success: true, user: {...newUser._doc, password: ''}})

  } catch (error) {
    console.log('Error in signup controller: ',error.message)
    return res.status(500).json({success: false, message: 'Internal Server eerror'})
  }
};

export const login = async (req, res, next) => {};

export const logout = async (req, res, next) => {};
