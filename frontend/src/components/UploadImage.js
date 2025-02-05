import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const onChange = e => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/ai/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Dish Image for Nutritional Info</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={onChange} required />
        <button type="submit">Upload</button>
      </form>
      {result && (
        <div>
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
