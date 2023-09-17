import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeSearchWithSimilarFoods() {
  const [recipeQuery, setRecipeQuery] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [flickrPhoto, setFlickrPhoto] = useState('');
  const [similarFoods, setSimilarFoods] = useState('');
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

      // 2. Send a request to the Flickr API for a random photo related to the recipe
      const flickrResponse = await axios.get(`/api/flickr/photos?query=${recipeQuery}`);
      const randomPhoto = flickrResponse.data[Math.floor(Math.random() * flickrResponse.data.length)];

      // 3. Send a request to the OpenAI API route to generate similar foods
      const openAISimilarFoodsResponse = await axios.get(`/api/openai/generate-similar-foods?recipe=${recipeQuery}`);
      const generatedSimilarFoods = openAISimilarFoodsResponse.data.generatedSimilarFoods;

      // Clear any previous errors
      setError('');

      // Update the state with the fetched data
      setRecipeData(recipe);
      setFlickrPhoto(randomPhoto.imageUrl);
      setSimilarFoods(generatedSimilarFoods);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching data. Please enter a valid recipe', error);
    }
  };

  return (
    <div>
      <h2>Recipe Search with Similar Foods</h2>
      <p>The purpose of this application is to enter a recipe query to find a recipe. Once a recips is found,
         a related photo will appear, and similar dishes in relation to the queried recipe will be generated.</p>
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
          <h3>Related Photo</h3>
          <img src={flickrPhoto} alt="Random Flickr" />
        </div>
      )}
      {similarFoods && (
        <div>
          <h3>Generated Similar Foods:</h3>
          <p>{similarFoods}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeSearchWithSimilarFoods;
