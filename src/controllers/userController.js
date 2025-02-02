const { messages, errorMessages } = require('../helpers/constant');
const isValidObjectId = require('../helpers/utils');
const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: errorMessages.emailExist });
    }
    const user = await User.create({ firstName, lastName, email, age });

    console.log( messages.OPERATION_SUCCESS.replace("{method}", 'created'));
    res.status(201).json({
        message: `user created successfully with ID ${user._id}`,
        userId: user._id,
        email: user.email
    });
  } catch (err) {
    console.log(`${errorMessages.OPERATION_FAILED.replace("{method}", 'creating')}${err.message}`);
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: errorMessages.invalidUserId });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: errorMessages.USER_NOT_FOUND.replace("{userId}", id) });
      }
      console.log( messages.OPERATION_SUCCESS.replace("{method}", 'fetched'));
      res.json(user);
    } catch (err) {
      console.log(`${errorMessages.OPERATION_FAILED.replace("{method}", 'retriving')}${err.message}`);
      next(err);
    }
};


exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: errorMessages.invalidUserId });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      console.log(errorMessages.USER_NOT_FOUND.replace("{userId}", id));
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND.replace("{userId}", id) });
    }
    console.log( messages.OPERATION_SUCCESS.replace("{method}", 'deleted'));
    res.json({ message: messages.OPERATION_SUCCESS.replace("{method}", 'deleted')});
  } catch (err) {
    console.log(`${errorMessages.OPERATION_FAILED.replace("{method}", 'delete')}${err.message}`);
    next(err);
  }
};
