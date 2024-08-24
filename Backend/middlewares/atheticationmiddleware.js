import jwt from 'jsonwebtoken';
import Users from '../models/Loginmodel.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token",token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded",decoded);
      req.user = await Users.findById(decoded.id).select("-password");
      console.log("req.user",req.user);
      next();
    } catch (error) {
        console.log("error",error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

