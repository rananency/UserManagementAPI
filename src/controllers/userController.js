const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = await User.create({ firstName, lastName, email, age });
    res.status(201).json({
        message: `user created successfully with ID ${user._id}`,
        userId: user._id,
        email: user.email
    });
  } catch (err) {
    next(err);
  }
};
