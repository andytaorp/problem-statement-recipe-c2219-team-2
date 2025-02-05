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

    const response = await fetch('http://localhost:4000/api/recipes/' + recipe._id, {
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
      <h4>{recipe.title}</h4> 
      <p><strong>Ingredients: </strong>{recipe.ingredients}</p> 
      <p><strong>Steps: </strong>{recipe.steps}</p>

      <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleEdit} style={{ marginRight: "50px" }}>edit</span>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default RecipeDetails