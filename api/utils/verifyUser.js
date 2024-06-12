import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "User not logged in"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
