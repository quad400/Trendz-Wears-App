const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    }

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Not authorized, no token",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err?.message,
    });
  }
};

module.exports = isAuthenticated;
