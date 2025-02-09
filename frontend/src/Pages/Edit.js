import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeContext } from "../Hooks/useRecipeContext";
// import { useAuthContext } from "../Hooks/useAuthContext";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useRecipeContext();
  // const { user } = useAuthContext();


  const [name, setName] = useState(""); 
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  // const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token; // Access the token from the user object

  useEffect(() => {
    const fetchRecipe = async () => {
      // Retrieve the user object from localStorage and extract the token
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token; // Access the token from the user object
  
      console.log("Token from localStorage:", token); // Log token to check
  
      if (!token) {
        setError("User not authenticated.");
        return; // Stop here if token is not available
      }
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
  
      const json = await response.json();
  
      if (response.ok) {
        setName(json.name);
        setIngredients(json.ingredients.join(", "));
        setInstructions(json.instructions);
        setPrepTime(json.prepTime);
        setDifficulty(json.difficulty);
        
      } else {
        setError("Failed to fetch recipe: " + json.error);
      }
    };
  
    fetchRecipe();
  }, [id]); // Re-run this effect when the `id` changes
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim());
    const updatedRecipe = {
      name,
      ingredients: ingredientsArray,
      instructions,
      prepTime: Number(prepTime),
      difficulty,
      imageUrl,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
      
      method: "PATCH",
      body: JSON.stringify(updatedRecipe),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      dispatch({ type: "UPDATE_RECIPE", payload: json });
      navigate("/");
    }
  };

  return (
    <div className="edit-page">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Recipe Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Ingredients (separated by commas):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>

        <label>Preparation Time (minutes):</label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />

        <label>Difficulty Level:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* <label>Image URL (optional):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /> */}

        <button type="submit">Update Recipe</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Edit;
