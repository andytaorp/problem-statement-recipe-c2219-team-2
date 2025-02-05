import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 
// pages & components
<<<<<<< HEAD:frontend/App.js
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import AddRecipe from "./pages/AddRecipe";
import Navbar from "./src/components/Navbar";
=======
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import RecipeForm from './components/RecipeForm';
import RecipeEdit from './components/RecipeEdit';
import UploadImage from './components/UploadImage';
>>>>>>> 2c135c927c9917948a0283622718c8183c5a9cdb:frontend/src/App.js
import "./App.css";
 
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/add-recipe"
              element={<AddRecipe />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
 