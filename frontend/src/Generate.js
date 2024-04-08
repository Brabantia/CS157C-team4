import React, { useState } from 'react';
import './Generate.css'; // Import  CSS

function Generate() {
  const [recipeType, setRecipeType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cuisineType, setCuisineType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const preferences = {
      recipeType,
      ingredients,
      cuisineType
    };

    try {
      const response = await fetch('http://localhost:3000', {  // need to change 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences })
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error.message);
    }

    // Reset form 
    setRecipeType('');
    setIngredients('');
    setCuisineType('');
  };

  return (
    <div>
      <h2>Recipe Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Recipe Type:
            <input 
              type="text" 
              value={recipeType} 
              onChange={(e) => setRecipeType(e.target.value)} 
              placeholder="e.g., vegetarian, non-vegetarian" 
            />
          </label>
        </div>
        <div>
          <label>
            Ingredients:
            <input 
              type="text" 
              value={ingredients} 
              onChange={(e) => setIngredients(e.target.value)} 
              placeholder="e.g., tomatoes, chicken, pasta" 
            />
          </label>
        </div>
        <div>
          <label>
            Cuisine Type:
            <input 
              type="text" 
              value={cuisineType} 
              onChange={(e) => setCuisineType(e.target.value)} 
              placeholder="e.g., Italian, Indian, Mexican" 
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RecipeForm;
