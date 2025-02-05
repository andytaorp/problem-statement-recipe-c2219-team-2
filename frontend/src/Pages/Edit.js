import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeContext } from "../Hooks/useRecipeContext";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useRecipeContext();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setName(json.name);
        setIngredients(json.ingredients.join(", "));
        setInstructions(json.instructions);
        setPrepTime(json.prepTime);
        setDifficulty(json.difficulty);
        setImageUrl(json.imageUrl || "");
      } else {
        setError("Failed to fetch recipe");
      }
    };

    fetchRecipe();
  }, [id]);

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

    const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedRecipe),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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

        <label>Image URL (optional):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit">Update Recipe</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Edit;
