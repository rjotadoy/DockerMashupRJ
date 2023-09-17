const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

// Configure AWS SDK (replace with your own credentials from the AWS console)
AWS.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
  region: 'ap-southeast-2',
});

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key for the page counter
const bucketName = 'rj-cab432-page-visits'; // unique bucket name
const counterObjectKey = 'page-counter.json';

// Middleware to increment the page counter
router.use((req, res, next) => {
  // Retrieve the current page count from S3
  getPageCountFromS3()
    .then((count) => {
      // Increment the page count
      const newCount = count + 1;

      // Save the updated count to S3
      savePageCountToS3(newCount);

      // Attach the page count to the response for use in your frontend
      res.locals.pageCount = newCount;

      next();
    })
    .catch((error) => {
      console.error('Error retrieving or updating page count:', error);
      next();
    });
});

// Route to get the current page count
router.get('/pagecount', (req, res) => {
  // The updated page count is attached to res.locals by the middleware
  const pageCount = res.locals.pageCount || 0;
  res.json({ pageCount });
});

// Retrieve the current page count from S3
async function getPageCountFromS3() {
  try {
    const data = await s3.getObject({ Bucket: bucketName, Key: counterObjectKey }).promise();
    const count = JSON.parse(data.Body.toString('utf-8'));
    return count;
  } catch (error) {
    // If the object doesn't exist, return 0 as the initial count
    if (error.code === 'NoSuchKey') {
      return 0;
    }
    throw error;
  }
}

// Save the updated page count to S3
async function savePageCountToS3(count) {
  const params = {
    Bucket: bucketName,
    Key: counterObjectKey,
    Body: JSON.stringify(count), // Convert count to JSON string
    ContentType: 'application/json', // Set content type
  };

  try {
    await s3.putObject(params).promise();
  } catch (error) {
    console.error('Error saving page count to S3:', error);
  }
}

module.exports = router;
