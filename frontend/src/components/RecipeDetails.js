import { useRecipeContext } from '../Hooks/useRecipeContext'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipeContext()
  const { user } = useAuthContext()
  const navigate = useNavigate();


  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/` + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_RECIPE', payload: json})
    }
  }

  const handleEdit = () => {
    if (!user) {
      return
    }
    navigate(`/edit/${recipe._id}`);
  };

  return (
    <div className="recipe-details">
      <h4>{recipe.name}</h4> 
      <p><strong>Ingredients: </strong>{recipe.ingredients}</p> 
      <p><strong>Instructions:</strong>{recipe.instructions}</p>
      <p><strong>Peparation Time:</strong>{recipe.prepTime}</p>
      <p><strong>Difficulty:</strong>{recipe.difficulty}</p>
      {/* <p><strong>Image:</strong><img src='{recipe.ImageUrl}' alt="Placeholder"/></p> */}

      <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleEdit} style={{ marginRight: "50px" }}>Edit</span>
      <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
    </div>
  )
}

export default RecipeDetails