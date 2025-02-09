import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './Hooks/useAuthContext'

// pages & components
import Home from './Pages/Home'
import Edit from './Pages/Edit'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import FoodLog from './Pages/foodLog'
import Navbar from './components/Navbar'


function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/edit/:id" 
              element={user ? <Edit /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/foodLog" 
              element={user ? <FoodLog /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;