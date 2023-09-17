import React, { useState, useEffect } from 'react';

function PageCounter() {
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(null);
  const [isUpdatingCredentials, setIsUpdatingCredentials] = useState(false);

  useEffect(() => {
    // Make an HTTP GET request to fetch the page count from your backend
    fetch('/pagecount')
      .then((response) => response.json())
      .then((data) => {
        // Update the page count in the component's state
        setPageCount(data.pageCount);

        // Check if the page count is 0 and prompt for AWS credentials update
        if (data.pageCount === 0) {
          setIsUpdatingCredentials(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching page count:', error);
        setError('Error fetching page count. Please check your AWS credentials.');
      });
  }, []);

  return (
    <div>
      <h2>Mashup Project using Edamam, Flickr, and Open AI API</h2>
      {isUpdatingCredentials ? (
        <div>
          <p style={{ color: 'red' }}>Error fetching page count. Please update your AWS credentials.</p>
          {/* You can add a button or link here to trigger the credential update */}
        </div>
      ) : (
        <p>Current Page Count: {pageCount}</p>
      )}
      {error && !isUpdatingCredentials && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
    </div>
  );
}

export default PageCounter;

