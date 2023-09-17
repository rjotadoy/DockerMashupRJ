import React, { useState } from 'react';
import axios from 'axios';

function ShoppingList() {
  const [recipeQuery, setRecipeQuery] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [flickrPhoto, setFlickrPhoto] = useState('');
  const [estimatedCostInAUD, setEstimatedCostInAUD] = useState('');
  const [error, setError] = useState('');

  const handleRecipeInputChange = (event) => {
    setRecipeQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      if (!recipeQuery) {
        setError('Please enter a recipe query.'); // Error for empty input
        return;
      }

      // 1. Send a request to the Edamam API for the recipe
      const recipeResponse = await axios.get(`/api/edamam/recipes?q=${recipeQuery}`);
      const recipe = recipeResponse.data[0]; // Assuming the first recipe is used

      if (!recipe) {
        setError('No recipes found. Please try another query.'); // Error for invalid recipe
        return;
      }

      // Clear any previous errors
      setError('');

      // 2. Send a request to the Flickr API for a random photo related to the recipe
      const flickrResponse = await axios.get(`/api/flickr/photos?query=${recipeQuery}`);
      const randomPhoto = flickrResponse.data[Math.floor(Math.random() * flickrResponse.data.length)];

      // 3. Send a request to the new OpenAI API route to generate the estimated cost of the meal in AUD
      const openAICostResponse = await axios.get(`/api/openai/generate-meal-cost?recipe=${recipeQuery}`);
      const estimatedCost = openAICostResponse.data.estimatedCostInAUD;
      setEstimatedCostInAUD(estimatedCost);

      // Update the state with the fetched data
      setRecipeData(recipe);
      setFlickrPhoto(randomPhoto.imageUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Recipe Search, Photo, and Estimated Cost Generator</h2>
      <p>The purpose of this application is to enter a recipe of a dish you want to make. After,
        a photo will be generated related to the recipe, and the estimated cost of the meal will be displayed.
      </p>
      <div>
        <label>Enter a recipe query:</label>
        <input
          type="text"
          value={recipeQuery}
          onChange={handleRecipeInputChange}
          placeholder="E.g., 'Chicken curry'"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && (
        <div style={{ color: 'red' }}>
          {error}
        </div>
      )}
      {recipeData && (
        <div>
          <h3>Recipe:</h3>
          <p>{recipeData.recipeName}</p>
          <ul>
            {recipeData.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <a href={recipeData.recipeUrl} target="_blank" rel="noopener noreferrer">View Recipe</a>
        </div>
      )}
      {flickrPhoto && (
        <div>
          <h3>Inspiring Photo</h3>
          <img src={flickrPhoto} alt="Random Flickr" />
        </div>
      )}
      {estimatedCostInAUD && (
        <div>
          <h3>Estimated Cost:</h3>
          <p>{estimatedCostInAUD}</p>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
