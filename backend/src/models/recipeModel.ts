import mongoose, { ObjectId } from 'mongoose';
import { Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  ingredients: string;
  recipeDescription: string;
  createdAt: Date;
}

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  recipeDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Recipe = mongoose.model<IRecipe>('recipes', recipeSchema);

export default Recipe;
