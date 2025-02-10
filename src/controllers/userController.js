import { messages, errorMessages } from '../helpers/constant.js';
import { buildSearchQuery, isValidObjectId } from '../helpers/utils.js';
import User from '../models/userModel.js';

 export const createUser = async (req, res, next) => {
   try {
    const { firstName, lastName, email, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: errorMessages.EMAIL_EXIST });
    }
    const user = await User.create({ firstName, lastName, email, age });

    console.log(messages.OPERATION_SUCCESS.replace('{method}', 'created'));
    res.status(201).json({
      message: `user created successfully with ID ${user._id}`,
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    console.log(`${errorMessages.OPERATION_FAILED.replace('{method}', 'creating')}${err.message}`);
    next(err);
  }
};

 export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: errorMessages.INVALID_USER_ID });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND.replace('{userId}', id) });
    }
    console.log(messages.OPERATION_SUCCESS.replace('{method}', 'fetched'));
    res.json(user);
  } catch (err) {
    console.log(`${errorMessages.OPERATION_FAILED.replace('{method}', 'retrieving')}${err.message}`);
    next(err);
  }
};

 export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: errorMessages.INVALID_USER_ID });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      console.log(errorMessages.USER_NOT_FOUND.replace('{userId}', id));
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND.replace('{userId}', id) });
    }

    console.log(messages.OPERATION_SUCCESS.replace('{method}', 'deleted'));
    res.json({ message: messages.OPERATION_SUCCESS.replace('{method}', 'deleted') });
  } catch (err) {
    console.log(`${errorMessages.OPERATION_FAILED.replace('{method}', 'delete')}${err.message}`);
    next(err);
  }
};

 export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: errorMessages.INVALID_USER_ID });
    }

    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, age }, { new: true });

    if (!user) {
      console.log(errorMessages.USER_NOT_FOUND.replace('{userId}', id));
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND.replace('{userId}', id) });
    }
    console.log(messages.OPERATION_SUCCESS.replace('{method}', 'updated'));
    res.json({ message: messages.OPERATION_SUCCESS.replace('{method}', 'updated') });
  } catch (err) {
    console.log(`${errorMessages.OPERATION_FAILED.replace('{method}', 'updating')}${err.message}`);
    next(err);
  }
};

 export const searchUsers = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;

    if ((firstName && typeof firstName !== 'string') ||
        (lastName && typeof lastName !== 'string') ||
        (email && typeof email !== 'string')) {
      return res.status(400).json({ message: 'Invalid input, expected strings' });
    }

    const query = buildSearchQuery({ firstName, lastName, email });

    const users = await User.find(query);

    res.json(users);
  } catch (err) {
    console.log(`Error searching users: ${err.message}`);
    next(err);
  }
};
