import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

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
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;

    // if (!passwordRegex.test(password)) {
    //   console.log("first");
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Password must have length of 8 characters, have an uppercase and lowercase letter, and a special character",
    //   });
    // }
    const passwordRegexLength = /^.{8,}$/;
    const passwordRegexUppercase = /[A-Z]/;
    const passwordRegexLowercase = /[a-z]/;
    const passwordRegexDigit = /\d/;
    const passwordRegexSpecialChar = /[@$!%*_?&]/;
    
    let errors = {};
    
    // Check if password meets the length requirement
    if (!passwordRegexLength.test(password)) {
      errors.length = "Password must be at least 8 characters long.";
    }
    
    // Check if password contains at least one uppercase letter
    if (!passwordRegexUppercase.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter.";
    }
    
    // Check if password contains at least one lowercase letter
    if (!passwordRegexLowercase.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter.";
    }
    
    // Check if password contains at least one digit
    if (!passwordRegexDigit.test(password)) {
      errors.digit = "Password must contain at least one digit.";
    }
    
    // Check if password contains at least one special character
    if (!passwordRegexSpecialChar.test(password)) {
      errors.specialChar = "Password must contain at least one special character (@$!%*_?&).";
    }
    
    // If there are any errors, return them as separate fields
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors,
      });
    }

    const existingUserEmail = await User.findOne({ email: email });

    if (existingUserEmail) {
      console.log("2");
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUserUsername = await User.findOne({ username: username });

    if (existingUserUsername) {
      console.log(3);
      return res
        .status(400)
        .json({ success: false, message: "username already exists." });
    }

    const profilePics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = profilePics[Math.floor(Math.random() * profilePics.length)];

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: "" } });
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server eerror" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res
      .status(201)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt-jamesFlix");
    return res
      .status(200)
      .json({ success: true, message: "Logout out successfully" });
  } catch (error) {
    console.log("Error in logout controlller: ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
