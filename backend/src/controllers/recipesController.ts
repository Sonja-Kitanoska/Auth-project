import Recipe from '../models/recipeModel';
import { Request, Response } from 'express';

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { title, ingredients, recipeDescription } = req.body;

    if (!title || !ingredients || !recipeDescription) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    const newRecipe = await Recipe.create({
      title,
      ingredients,
      recipeDescription,
    });

    res.status(201).json({
      recipe: newRecipe,
      message: 'A new recipe was added',
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
