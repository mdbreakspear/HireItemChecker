// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios'); // To make HTTP requests
const app = express();
const PORT = process.env.PORT || 3000;

// This allows the server to understand JSON data from the frontend.
app.use(express.json());

// (Optional) Serve your static files (like index.html) if needed
app.use(express.static('.'));

app.post('/api/check-availability', async (req, res) => {
  try {
    // Get data from the frontend
    const { startDate, endDate, hireItem } = req.body;
    
    // For demonstration, we simulate a "job" id.
    // In a real integration, you might create or reference an actual job.
    const jobId = 1;
    
    // Use the start date as the "local" date for the API call.
    const localDate = startDate;
    
    // Build the URL to call HireHop's availability endpoint.
    // (Check HireHop's API documentation for the correct endpoint and parameters.)
    const apiUrl = `https://myhirehop.com/php_functions/items_available.php?job=${jobId}&ids=${encodeURIComponent(hireItem)}&local=${encodeURIComponent(localDate)}&token=${encodeURIComponent(process.env.HIREHOP_API_TOKEN)}`;

    // Make the API call using axios.
    const response = await axios.get(apiUrl);
    
    // Send back the response from HireHop's API.
    res.json(response.data);
  } catch (error) {
    console.error("Error calling HireHop API:", error.message);
    res.status(500).json({ error: "Failed to check availability" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
