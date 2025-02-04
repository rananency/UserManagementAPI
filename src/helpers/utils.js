const mongoose = require('mongoose');

/**
 * Checks if the given ID is a valid MongoDB ObjectId.
 * @param {string} id - The ID to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * @typedef {object} Response
 * @property {ServiceResponse} serviceResponse ServiceResponse
 */

/**
 * Builds a MongoDB search query based on user input.
 * @param {string} firstName - First name of the user.
 * @param {string} lastName - Last name of the user.
 * @param {string} email - Email of the user.
 * @returns {Response} - MongoDB query object.
 */
exports.buildSearchQuery = ({ firstName, lastName, email }) => {
  const query = {};

  if (email) {
    query.email = email;
  } else if (firstName && lastName) {
    query.$or = [
      { firstName: { $regex: firstName, $options: 'i' } },
      { lastName: { $regex: lastName, $options: 'i' } },
    ];
  } else if (firstName) {
    query.firstName = { $regex: firstName, $options: 'i' };
  } else if (lastName) {
    query.lastName = { $regex: lastName, $options: 'i' };
  }

  return query;
};
