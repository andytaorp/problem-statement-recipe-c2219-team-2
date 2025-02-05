import React, { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "../services/api";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getRecipes().then((res) => setRecipes(res.data));
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h2>{recipe.name}</h2>
          <p>Prep Time: {recipe.prepTime} min</p>
          <button onClick={() => deleteRecipe(recipe._id, token)}>Delete</button>
        </div>
      ))}
    </div>
  );
}