import { createContext, useReducer } from "react";

export const RecipeContext = createContext();

export const recipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECIPE":
      return { 
        recipes: action.payload  // Ensuring consistency with `recipes`
      };
    case "CREATE_RECIPE":
      return { 
        recipes: [action.payload, ...state.recipes] 
      };
    case "DELETE_RECIPE":
      return { 
        recipes: state.recipes.filter(w => w._id !== action.payload._id) 
      };
    case "UPDATE_RECIPE":
      return {
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
      };
    default:
      return state;
  }
};

export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, { 
    recipes: []  // ✅ Initialize as an empty array
  });

  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};
