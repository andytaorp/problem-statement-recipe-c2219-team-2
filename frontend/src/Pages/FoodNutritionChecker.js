import React, { useState } from 'react';
import axios from 'axios';

const FoodNutritionChecker = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nutritionResult, setNutritionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setError('');
      setNutritionResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setError('Please select an image.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/api/ai/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setNutritionResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch nutrition data. Please try again.');
    }
    setLoading(false);
  };

  const renderNutritionData = () => {
    if (!nutritionResult) return null;

    return (
      <div className="nutrition-data">
        <h3>Nutritional Information:</h3>
        {/* You can render specific fields here instead of a JSON dump */}
        <pre>{JSON.stringify(nutritionResult, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="food-nutrition-checker" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>Food Nutrition Checker</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check Nutrition'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {renderNutritionData()}
    </div>
  );
};

export default FoodNutritionChecker;
