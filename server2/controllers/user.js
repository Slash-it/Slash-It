const { User } = require('../models');

class UserController {
  static async findAll (req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  static async addUser (req, res) {
    try {
      const { name, score } = req.body;
      const newUser = {
        name, score,
      };

      const addedUser = await User.create(newUser);
      res.status(201).json(addedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;