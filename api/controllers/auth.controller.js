import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.js";
import Listing from "../models/listing.model.js";

export async function signup(req, res, next) {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created sucessfully");
  } catch (error) {
    next(error);
  }
}

export async function signout(req, res, next) {
  try {
    res.clearCookie("access_token");
    return res.status(200).json("User created sucessfully");
  } catch (error) {
    next(error);
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-16);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() + Math.random(),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.imageURL,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60),
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export async function signin(req, res, next) {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not Found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword)
      return next(errorHandler(404, "Email or Password is incorrect!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
}

