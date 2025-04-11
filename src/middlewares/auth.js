const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

exports.verifyToken = async (req, res, next) => {
  try {
    // 1) Getting token from header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verification token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3) Check if user still exists
    const db = getDB();
    const currentUser = await db.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!currentUser) {
      return res.status(401).json({
        status: false,
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // 4) Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: 'Invalid token or expired. Please login again!',
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};