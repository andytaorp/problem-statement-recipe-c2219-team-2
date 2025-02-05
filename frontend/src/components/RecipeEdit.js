import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    difficulty: 'easy'
  });
  const { name, ingredients, instructions, prepTime, difficulty } = formData;

  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const recipe = res.data;
      setFormData({
        name: recipe.name,
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        difficulty: recipe.difficulty
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedData = {
      name,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions,
      prepTime: Number(prepTime),
      difficulty
    };
    try {
      await axios.patch(`http://localhost:5000/api/recipes/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
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
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default RecipeEdit;
