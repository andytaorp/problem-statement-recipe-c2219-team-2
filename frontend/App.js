import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 
// pages & components
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import AddRecipe from "./pages/AddRecipe";
import Navbar from "./src/components/Navbar";
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
 