import express from 'express';

import { signup } from '../controllers/authController';
import { login } from '../controllers/authController';
import { userVerification } from '../middlewares/authMiddelware';
import { createRecipe } from '../controllers/recipesController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/', userVerification);
router.post('/recipes', createRecipe);

export default router;
