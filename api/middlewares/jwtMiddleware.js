
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const roles = require('../enum/roles');

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

function verifySuperAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token');
    }
    const user = await User.findOne({ email: decoded.email, role: roles.SUPER_ADMIN })
    if (!user) {
      return res.status(401).send({ message: 'Unauthorised! Not a super admin.' });
    }
    req.user = user;
    next();
  });
}
function verifyOrgAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token');
    }
    const user = await User.findOne({ email: decoded.email, role: roles.ORG_ADMIN })
    if (!user) {
      return res.status(401).send({ message: 'Unauthorised! Not a org admin.' });
    }
    req.user = user;
    next();
  });
}

function handleMulterError(err, req, res, next) {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
}

module.exports = { handleMulterError, verifyToken, verifySuperAdmin, verifyOrgAdmin };
