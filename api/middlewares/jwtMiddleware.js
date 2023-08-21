
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token');
    }

    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return res.status(401).send({ message: 'Unauthorised!' });
    }
    req.user = user;

    next();
  });
}

module.exports = verifyToken;
