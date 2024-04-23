const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    //Get the email and password off req body
    const { email, password } = req.body;

    //hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Create a user with the data
    await User.create({ email, password: hashedPassword });
    //respond
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
const login = async (req, res) => {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      // If user not found, return 400 (Bad Request)
      return res.sendStatus(401);
    }

    // Compare the password provided with the hashed password stored in the database
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      // If passwords don't match, return 401 (Unauthorized)
      return res.sendStatus(401);
    }

    // Create a JWT token with user's ID as payload and set expiration
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // Expires in 30 days
    const token = jwt.sign(
      { sub: user._id, exp },
      "cfGg43x7z4G82z6UuT7R2Q5Hn8$cAeZvP"
    );

    //Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.log(error);
    // If an error occurs, return 500 (Internal Server Error)
    res.sendStatus(500);
  }
};

const logout = (req, res) => {
  res.clearCookie("Authorization");
  res.sendStatus(200);
};

const checkAuth = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
