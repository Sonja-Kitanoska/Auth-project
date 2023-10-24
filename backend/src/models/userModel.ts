import mongoose, { InferSchemaType } from 'mongoose';
import { Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Your username is required'],
  },
  password: {
    type: String,
    required: [true, 'Your password is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
