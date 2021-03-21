const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Minimum password length 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorsList = errors.array();

        return res.status(400).json({
          errors: errorsList,
          message: 'Incorrect registration data'
        });
      }

      const { email, password } = req.body;

      const existedUser = await User.findOne({ email });

      if (existedUser) {
        return res.status(400).json({ message: 'This user already exists' });
      }

      const cryptoSalt = 10;
      const hashedPassword = await bcrypt.hash(password, cryptoSalt);
      const newUser = new User({ email, password: hashedPassword });

      await newUser.save();

      res.status(201).json({ message: 'User created' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, please try again' });
    }
  });

module.exports = router;