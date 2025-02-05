import { useAuthContext } from './useAuthContext'
import { useRecipeContext } from './useRecipeContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchRecipes } = useRecipeContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchRecipes({ type: 'SET_RECIPES', payload: null })
  }

  return { logout }
}