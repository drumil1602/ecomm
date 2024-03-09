const jwt = require("jsonwebtoken");

// function authMiddleware(role) {
//   return function(req,res,next) {

//   }
// }

// authentication, authorization
const authMiddleware = (role) => (req, res, next) => {
  try {
    // authentication 
    const data = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );

    req.headers.authorization = ["Bearer", "aweivoweifhoweihfwefhnowehdfow"];
    const tokenFromHeaders = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(tokenFromHeaders);

    // 
    if (role.includes(payload.role)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "unauthenticated",
    });
  }
};

module.exports = authMiddleware;
