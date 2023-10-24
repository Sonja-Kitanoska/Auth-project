import User from '../models/userModel';
import { Request, Response } from 'express';
import { createSecretToken } from '../util/secretToken';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password, createdAt } = req.body;

    if (!email || !username || !password) {
      return res.json({
        status: 'error',
        message: 'Email, username, and password are required fields.',
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    const newUser = await User.create({ email, username, password, createdAt });
    const token = createSecretToken(newUser._id);
    res.cookie('token', token, {
      httpOnly: false,
    });
    console.log(newUser);
    console.log(req.body);
    res.status(201).json({
      message: 'User signed in successfully',
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    // res.json({
    //     status: 'error',
    //     message: 'User registration failed.',
    //     error: error.message,
    // });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: 'User logged in successfully', success: true });
  } catch (error) {
    console.error(error);
  }
};
