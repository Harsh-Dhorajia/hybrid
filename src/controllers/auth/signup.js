const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User');
const generate = require('../../utils/generateToken');

const signup = async (req, res) => {
  try {
    const { username, role } = req.body;
    let { password } = req.body;

    // check if user already exists
    const isUserAlreadyRegistered = await UserModel.find({
      username,
    });
    if (isUserAlreadyRegistered.length) {
      return res.status(403).send({
        message: 'username already exists',
      });
    }

    // encrypt given password
    password = await bcrypt.hash(password, 12);

    // create user with username, password and role
    const user = await UserModel.create({
      username,
      password,
      role,
    });

    // Generate auth token
    const token = generate(user);
    return res.status(200).send({
      message: 'User is registered successfully',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = signup;
