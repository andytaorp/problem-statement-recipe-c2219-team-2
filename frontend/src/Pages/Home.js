import { useEffect, useState } from "react";

// components
import RecipeDetails from "../components/RecipeDetails";
import RecipeForm from "../components/RecipeForm";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    getRecipes().then((res) => setRecipes(res.data));
  }, []);

  return (
    <div className="home">
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeDetails recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <RecipeForm setRecipes={setRecipes} />
    </div>
  );
};