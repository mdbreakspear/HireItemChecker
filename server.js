const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// To handle JSON data sent from the frontend
app.use(express.json());

// Example endpoint: This will eventually check the HireHop API.
app.post('/api/check-availability', (req, res) => {
  // For now, just echo back the received data.
  const { startDate, endDate, hireItem } = req.body;
  res.json({
    message: 'Received your request',
    data: { startDate, endDate, hireItem },
    availableQuantity: 10  // This is just a dummy value.
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
