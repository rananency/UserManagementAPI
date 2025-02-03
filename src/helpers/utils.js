const mongoose = require('mongoose');

/**
 * Checks if the given ID is a valid MongoDB ObjectId.
 * @param {string} id - The ID to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = isValidObjectId;
