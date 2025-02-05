import React, { useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState([
    { id: 1, name: "Spaghetti Carbonara", prepTime: 20 },
    { id: 2, name: "Chicken Curry", prepTime: 40 }
  ]);

  return (
    <div>
      <h1>Recipe List</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>Prep Time: {recipe.prepTime} min</p>
        </div>
      ))}
    </div>
  );
}