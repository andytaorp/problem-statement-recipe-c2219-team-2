import { useState } from "react"
import { useRecipeContext } from "../Hooks/useRecipeContext"
import { useAuthContext } from '../Hooks/useAuthContext'

const RecipeForm = () => {
  const { dispatch } = useRecipeContext()
  const { user } = useAuthContext()

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const recipe = { name, ingredients, instructions, prepTime, difficulty, imageUrl }

    const response = await fetch('api/recipe', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setIngredients('')
      setInstructions('')
      setPrepTime('')
      setDifficulty('')
      setImageUrl('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_RECIPE', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>

      <label>Recipe Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Ingredients:</label>
      <input
        type="number"
        onChange={(e) => setIngredients(e.target.value)}
        value={ingredients}
        className={emptyFields.includes('ingredients') ? 'error' : ''}
      />

      <label>Instructions:</label>
      <input
        type="number"
        onChange={(e) => setInstructions(e.target.value)}
        value={instructions}
        className={emptyFields.includes('instructions') ? 'error' : ''}
      />

      <label>Prep Time:</label>
      <input
        type="number"
        onChange={(e) => setPrepTime(e.target.value)}
        value={prepTime}
        className={emptyFields.includes('preptime') ? 'error' : ''}
      />

      <label>Set Difficult:</label>
      <input
        type="number"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
        className={emptyFields.includes('difficulty') ? 'error' : ''}
      />

      <label>Set Difficult:</label>
      <input
        type="text" 
        alt="Recipe Image"
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
        className={emptyFields.includes('imageUrl') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RecipeForm