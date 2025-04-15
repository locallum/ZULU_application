const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Fallback to index.html for routing in React app
app.get('/{*all}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
