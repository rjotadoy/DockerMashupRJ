import React, { useState } from 'react';
import axios from 'axios';

function RecipeSearch() {
  const [recipeQuery, setRecipeQuery] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [flickrPhoto, setFlickrPhoto] = useState('');
  const [story, setStory] = useState('');
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

      // 2. Send a request to the Flickr API for a photo of a person you like
      const flickrResponse = await axios.get('/api/flickr/photos?query=celebrity');
      const randomPhoto = flickrResponse.data[Math.floor(Math.random() * flickrResponse.data.length)];

      // 3. Send a request to the OpenAI API to generate a random story
      const openAIResponse = await axios.get(`/api/openai/generate-story?prompt=${recipeQuery}`);
      const generatedStory = openAIResponse.data.generatedStory;

      // Clear any previous errors
      setError('');

      // Update the state with the fetched data
      setRecipeData(recipe);
      setFlickrPhoto(randomPhoto.imageUrl);
      setStory(generatedStory);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching data. Please enter a valid recipe', error);
    }
  };

  return (
    <div>
      <h2>Recipe Search Story Generator Love Letter</h2>
      <p>The purpose of this application is to enter a recipe. Once you enter a recipe,
        a photo of someone you like will appear and a story will be created that you can send to that person as a love letter.
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
          <h3>Send recipe to:</h3>
          <img src={flickrPhoto} alt="Random Flickr" />
        </div>
      )}
      {story && (
        <div>
          <h3>Generated Story:</h3>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;
