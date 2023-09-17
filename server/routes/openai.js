const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Define a route to interact with the OpenAI API
router.get('/generate-story', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY; // Retrieve your OpenAI API key from environment variables
    const prompt = req.query.prompt; // You can pass the prompt as a query parameter

    // Adjust max_tokens to control the length of the generated story
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `${prompt}\n\nOnce upon a time,`, // Start the story with "Once upon a time,"
      max_tokens: 50, // Adjust based on your needs (e.g., 50 for a 50-word story)
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = response.data;
    res.json({ generatedStory: data.choices[0].text });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while using the OpenAI API.' });
  }
});

// Define a route to generate a personalized shopping list
router.get('/generate-shopping-list', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const recipe = req.query.recipe;
    const language = req.query.language || 'es'; // Default to Spanish if language is not specified

    // Customize the prompt to generate a shopping list based on the recipe in the specified language
    const prompt = `Generate a shopping list for the following recipe: "${recipe}" in ${language === 'es' ? 'Spanish' : 'English'}.`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: prompt,
      max_tokens: 50, // Adjust based on your needs
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = response.data;
    res.json({ generatedShoppingList: data.choices[0].text });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating the shopping list.' });
  }
});

// Define a route to generate the estimated cost of making a meal in AUD
router.get('/generate-meal-cost', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const recipe = req.query.recipe;

    // Customize the prompt to generate the estimated cost of making the meal in Australia
    const prompt = `Estimate the cost of making the following meal: "${recipe}" in Australia in AUD.`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: prompt,
      max_tokens: 50, // Adjust based on your needs
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = response.data;
    res.json({ estimatedCostInAUD: data.choices[0].text });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating the estimated cost of the meal in AUD.' });
  }
});

router.get('/generate-menu', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY; // Retrieve your OpenAI API key from environment variables
    const recipe = req.query.recipe; // Get the user-entered recipe from the query parameter

    // Customize the prompt to generate a menu based on the user's recipe
    const prompt = `Create a restaurant menu featuring the following dish:\n\n"${recipe}"\n\n`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: prompt,
      max_tokens: 200, // Adjust the max_tokens based on your desired menu length
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = response.data;
    res.json({ generatedMenu: data.choices[0].text });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating the menu.' });
  }
});

// Define a route to generate similar foods based on a recipe
router.get('/generate-similar-foods', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const recipe = req.query.recipe; // Get the user-entered recipe from the query parameter

    // Customize the prompt to generate similar foods based on the user's recipe
    const prompt = `Suggest similar foods to the following recipe:\n\n"${recipe}"\n\n`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: prompt,
      max_tokens: 200, // Adjust the max_tokens based on your desired output length
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = response.data;
    res.json({ generatedSimilarFoods: data.choices[0].text });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating similar foods.' });
  }
});


module.exports = router;
