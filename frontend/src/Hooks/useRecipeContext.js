import { RecipeContext } from "../Context/RecipeContext"
import { useContext } from "react"

export const useRecipeContext = () => {
  const context = useContext(RecipeContext)

  if(!context) {
    throw Error('useRecipeContext must be used inside an RecipeContextProvider')
  }

  return context
}