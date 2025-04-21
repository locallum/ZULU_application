const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const populationRetrievalURL =
  "https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/";
const trafficRetrievalURL = "https://ga1wu9p0i0.execute-api.us-east-1.amazonaws.com/dev"
const visualisationURL =
  "https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/";

//---------------------------RETRIEVAL CALLS---------------------------\\
app.get("/retrieve/population", async (req, res) => {
  const { suburbs, startYear, endYear } = req.query;
  try {
    const response = await axios.get(`${populationRetrievalURL}populations/v1`, {
      params: { suburbs, startYear, endYear },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from population retrieval API");
  }
});

app.get("/retrieve/population", async (req, res) => {
  const { suburbs, startYear, endYear } = req.query;
  try {
    const response = await axios.get(`${trafficRetrievalURL}populations/v1`, {
      params: { suburbs, startYear, endYear },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from traffic retrieval API");
  }
});

app.get("/retrieve/graphs", async (req, res) => {
  const { username } = req.query;
  const authHeader = req.headers.authorization;

  if (!username || !authHeader) {
    return res.status(400).json({ error: 'Missing username or token' });
  }

  try {
    const response = await axios.get(`${trafficRetrievalURL}/download-graphs/v1`, {
      params: { username },
      headers: {
        Authorization: authHeader,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//-------------------------VISUALISATION CALLS-------------------------\\
app.get("/visualisation", async (req, res) => {
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

//-------------------------UPLOAD (S3) CALLS-------------------------\\
app.post("/save/graph", async (req, res) => {
  const { suburbs, username, image_base64 } = req.body;
  const authHeader = req.headers.authorization;

  if (!username || !authHeader || !suburbs || !image_base64) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.post(`${trafficRetrievalURL}/upload-graph/v1`, {
      suburbs,
      username,
      "image-base64": image_base64,
    }, {
      headers: {
        Authorization: authHeader,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error saving graph:", error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to save graph' });
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
