const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden: Only artists can perform this action",
      });
    }
    req.user = decoded; // We are creating new property user in request which never exists befor and attaching the decoded user information to it
    next(); //so that req can move forward to the next middleware or controller.
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);
    console.log("Role:", decoded.role);

    if (decoded.role !== "user") {
      return res.status(403).json({
        message: "Forbidden: Only users can perform this action",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authArtist, authUser };
