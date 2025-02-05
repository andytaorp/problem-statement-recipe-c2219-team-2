import { useState } from "react"
import { useRecipeContext } from "../Hooks/useRecipeContext"
import { useAuthContext } from '../Hooks/useAuthContext'

const RecipeForm = () => {
  const { dispatch } = useRecipeContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const recipe = {title, ingredients, steps, difficulty}

    const response = await fetch('/api/recipe', {
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
      setTitle('')
      setIngredients('')
      setSteps('')
      setDifficulty('easy')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_RECIPE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>

      <label>Recipe Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Ingredients</label>
      <input 
        type="text"
        onChange={(e) => setIngredients(e.target.value)}
        value={ingredients}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

    <label>Steps:</label>
      <input 
        type="text"
        onChange={(e) => setSteps(e.target.value)}
        value={steps}
        className={emptyFields.includes('steps') ? 'error' : ''}
      />

      {/*  <label>Difficulty:</label> m not confident in the select part 
      <select
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
        className={emptyFields.includes('difficulty') ? 'error' : ''}
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="difficult">difficul</option>
      </select>*/}

      <button>Add Recipe</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RecipeForm