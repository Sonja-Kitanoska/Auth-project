import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface Response {
  status: boolean;
  user: string;
}
interface PostResponse {
  recipe: Recipe;
  message: string;
  success: boolean;
}
interface Recipe {
  title: string | undefined;
  ingredients: string | undefined;
  recipeDescription: string | undefined;
}

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies<string>([]);
  const [username, setUsername] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe>({
    title: '',
    ingredients: '',
    recipeDescription: '',
  });
  const [postedRecipe, setPostedRecipe] = useState<Recipe>({
    title: '',
    ingredients: '',
    recipeDescription: '',
  });

  const createRecipeRequest = async () => {
    try {
      const { data } = await axios.post<PostResponse>(
        'http://localhost:8000/recipes',
        {
          title: recipe.title,
          ingredients: recipe.ingredients,
          recipeDescription: recipe.recipeDescription,
        },
      );
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }
      const { data } = await axios.post<Response>(
        'http://localhost:8000',
        {},
        {
          withCredentials: true,
        },
      );
      const { status, user } = data;
      setUsername(user);
      console.log(status, user);

      return status
        ? toast(`Hello ${user}`, {
            position: 'top-right',
          })
        : (removeCookie('token', {}), navigate('/login'));
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie('token', {});
    navigate('/login');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
    console.log(recipe);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createRecipeRequest();

    if (result) {
      const { title, ingredients, recipeDescription } = result.recipe;

      setPostedRecipe({
        title,
        ingredients,
        recipeDescription,
      });
      console.log(postedRecipe);

      setRecipe({ title: '', ingredients: '', recipeDescription: '' });
      return postedRecipe;
    }
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {' '}
          Welcome <span>{username}</span>
        </h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInput}
          />
          <label htmlFor="ingredients"></label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleInput}
          />
          <label htmlFor="recipeDescription"></label>
          <input
            type="text"
            name="recipeDescription"
            value={recipe.recipeDescription}
            onChange={handleInput}
          />
          <button type="submit">Post recipe</button>
        </form>
        {postedRecipe && (
          <div>
            <h5>Created Recipe:</h5>
            <p>Title: {postedRecipe.title}</p>
            <p>Ingredients: {postedRecipe.ingredients}</p>
            <p>Recipe Description: {postedRecipe.recipeDescription}</p>
          </div>
        )}
        <button onClick={Logout}>LOGOUT</button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
