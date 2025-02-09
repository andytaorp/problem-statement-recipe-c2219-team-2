import { useEffect } from 'react';
import { useRecipeContext } from '../Hooks/useRecipeContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import RecipeForm from '../components/RecipeForm'

// components
import RecipeDetails from '../components/RecipeDetails'

const Home = () => {
  const { recipes, dispatch } = useRecipeContext();  
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_RECIPE', payload: json });
        } else {
          console.error('Error fetching recipes:', json);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchRecipe();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="recipe">
        {recipes && recipes.map((recipe) => ( 
          <RecipeDetails key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <RecipeForm />
    </div>
  );
};

export default Home;
