const express = require('express');
const axios = require('axios');

const router = express.Router();

// Define a route to fetch Flickr photos
router.get('/photos', async (req, res) => {
  try {
    const FLICKR_API_KEY = process.env.FLICKR_API_KEY; // Replace with your Flickr API key
    const { query } = req.query; // Get the query parameter from the request

    // Use the query parameter if provided; otherwise, default to 'joji'
    const tags = query;

    // Make a GET request to the Flickr API
    const response = await axios.get('https://api.flickr.com/services/rest', {
      params: {
        method: 'flickr.photos.search',
        api_key: FLICKR_API_KEY,
        tags: tags,
        per_page: 10,   // Modify the number of photos to retrieve
        format: 'json',
        nojsoncallback: 1,
        media: 'photos',
      },
    });

    const data = response.data;
    // const data = response.data;
    console.log(data); // Log the response data to the console

    
    // Check if the 'photos' property exists in the response
    if (data.photos && data.photos.photo) {
      const photos = data.photos.photo;

      // Format the response data as needed
      const formattedPhotos = photos.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
        imageUrl: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      }));

      res.json(formattedPhotos);
    } else {
      // Handle the case where the expected properties are missing
      res.status(500).json({ error: 'Unexpected response from Flickr API.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching Flickr photos.' });
  }
});

module.exports = router;
