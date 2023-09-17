const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Define a route to fetch recipes from the Edamam API
router.get('/recipes', async (req, res) => {
  try {
    const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY; // Retrieve API key from .env file
    const searchTerm = req.query.q; // User's search term from the URL query

    // Define query parameters for the Edamam API
    const queryParams = {
      app_id: process.env.EDAMAM_APP_ID, // Add your Edamam App ID
      app_key: EDAMAM_API_KEY,
      q: searchTerm,
      // You can add more parameters here as needed (e.g., dietary restrictions, cuisine, etc.)
    };

    // Make a GET request to the Edamam API
    const response = await axios.get('https://api.edamam.com/search', {
      params: queryParams,
    });

    const data = response.data;
    console.log(data); // For troubleshooting

    // Check if there are recipes in the response
    if (data.hits && data.hits.length > 0) {
      const recipes = data.hits.map((hit) => ({
        recipeName: hit.recipe.label,
        ingredients: hit.recipe.ingredientLines,
        recipeUrl: hit.recipe.url,
      }));

      res.json(recipes);
    } else {
      // Handle the case where no recipes were found
      console.error('No recipes found for the given search term:', searchTerm);
      res.status(404).json({ error: 'No recipes found for the given search term.' });
    }
  } catch (error) {
    console.error('Edamam API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while fetching Edamam recipes.' });
  }
});

module.exports = router;
