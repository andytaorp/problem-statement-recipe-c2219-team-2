import { useEffect }from 'react'
import { useRecipeContext } from "../Hooks/useRecipeContext"
import { useAuthContext } from "../Hooks/useAuthContext"
import RecipeForm from "../components/RecipeForm"

// components
import RecipeDetails from '../components/RecipeDetails'


const Home = () => {
  const {recipe, dispatch} = useRecipeContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch('/api/recipe', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RECIPE', payload: json})
      }
    }

    if (user) {
      fetchRecipe()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="recipe">
        {recipe && recipe.map((recipe) => (
          <RecipeDetails key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <RecipeForm />
    </div>
  )
}

export default Home