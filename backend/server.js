const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const retreivalURL =
  "https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/";
const visualisationURL =
  "https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/";

//---------------------------RETRIEVAL CALLS---------------------------\\
app.get("/retrieve/singleSuburb", async (req, res) => {
  const { suburbs, startYear, endYear } = req.query;
  try {
    const response = await axios.get(`${retreivalURL}populations/v1`, {
      params: { suburbs, startYear, endYear },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from retrieval API");
  }
});

//-------------------------VISUALISATION CALLS-------------------------\\
app.get("/visualisation/singleSuburb", async (req, res) => {
  const { title, x_header, y_header, labels, x_data, y_data } = req.query;

  try {
    const response = await axios.get(
      `${visualisationURL}populations/visualisation/v1`,
      {
        params: {
          graphTitle: title,
          "x-header": x_header,
          "y-header": y_header,
          "labels": labels,
          "x-data": x_data,
          "y-data": y_data,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from visualisation API");
  }
});

//--------------------------SERVING FRONTEND---------------------------\\

// Serve static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Fallback to index.html for routing in React app
app.get("/{*all}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running...");
});
