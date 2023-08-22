const mongoose = require('mongoose');
const validObject = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid product ID' });
  next();
};

module.exports = validObject;