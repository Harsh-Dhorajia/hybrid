const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const generate = require('../../utils/generateToken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find given user if exist
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    // compare if password is correct or not
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({
        message: 'Password is invalid',
      });
    }

    // Genearate auth token
    const token = generate(user);
    return res.status(200).send({
      message: 'User is log in successfully',
      data: {
        token,
      },
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = login;
