const mongoose = require('mongoose');
const validObject = (idToCheck) => (req, res, next) => {
  if (req.body[idToCheck] && !mongoose.Types.ObjectId.isValid(req.body[idToCheck]))
    return res.status(400).json({ msg: 'Invalid product ID' });
  next();
};

module.exports = validObject;