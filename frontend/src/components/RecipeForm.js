import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    difficulty: 'easy'
  });
  const navigate = useNavigate();
  const { name, ingredients, instructions, prepTime, difficulty } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const recipeData = {
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions,
      prepTime: Number(prepTime),
      difficulty
    };
    try {
      await axios.post('http://localhost:5000/api/recipes', recipeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input type="text" name="ingredients" value={ingredients} onChange={onChange} required />
        </div>
        <div>
          <label>Cooking Instructions:</label>
          <textarea name="instructions" value={instructions} onChange={onChange} required />
        </div>
        <div>
          <label>Preparation Time (in minutes):</label>
          <input type="number" name="prepTime" value={prepTime} onChange={onChange} required />
        </div>
        <div>
          <label>Difficulty Level:</label>
          <select name="difficulty" value={difficulty} onChange={onChange} required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
