import mongoose from 'mongoose';

/**
 * Checks if the given ID is a valid MongoDB ObjectId.
 * @param {string} id - The ID to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * @typedef {Object} Response
 * @property {string} [email] - The exact email match if provided.
 * @property {string} [firstName] - A case-insensitive regex search for the first name.
 * @property {string} [lastName] - A case-insensitive regex search for the last name.
 */

/**
 * Builds a MongoDB search query based on the provided user details.
 * @param {Object} params - The search parameters.
 * @param {string} [params.firstName] - First name of the user (optional).
 * @param {string} [params.lastName] - Last name of the user (optional).
 * @param {string} [params.email] - Email of the user (optional).
 * @returns {Response} - The MongoDB query object with the appropriate search criteria.
 */

export const buildSearchQuery = ({ firstName, lastName, email }) => {
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

