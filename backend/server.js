const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const populationRetrievalURL =
  "https://nzukdmrh2b.execute-api.us-east-2.amazonaws.com/prod/";
const trafficRetrievalURL = "https://ga1wu9p0i0.execute-api.us-east-1.amazonaws.com/dev/"
const visualisationURL =
  "https://ffkfzfk8t7.execute-api.us-east-1.amazonaws.com/dev/";



function generatePrompt(formattedString, platform) {
  const isPopulation = platform === "population";

  const promptIntro = isPopulation
    ? "Here is population projection data for one or more suburbs:\n\n"
    : "Here is average traffic data for one or more suburbs:\n\n";

  const isSingleSuburb = (formattedString.match(/Suburb:/g) || []).length === 1;

  const insightInstruction = isSingleSuburb
    ? isPopulation
      ? "Analyse the population projection for this suburb. Mention notable trends or patterns with percentages and stats. Keep it brief (max 4 key points)."
      : "Analyse the traffic trends for this suburb. Mention notable trends or patterns with percentages and stats. Keep it brief (max 4 key points)."
    : isPopulation
    ? "Compare the population projections of these suburbs. Highlight up to 4 key points: include which suburb has the highest growth (and by how much)."
    : "Compare the traffic trends across the suburbs. Highlight up to 4 key points: include which suburb has the highest traffic growth (historically) (and by how much). Only show the insights, not any considerations to consider please.";

  return `${promptIntro}${formattedString.trim()}\n\n${insightInstruction}`;
}
  


async function fetchGemini(promptText) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          key: "AIzaSyBeIPCCH_-W2QdXwgwFfJ1FPMItcXAfXuQ"
        }
      }
    );

    // Extract the model's reply text
    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "No insights were returned.";
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    throw new Error("Error calling Gemini API");
  }
}

  

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

app.get("/retrieve/traffic", async (req, res) => {
  const { suburbs, startYear, endYear } = req.query;
  try {
    const response = await axios.get(`${trafficRetrievalURL}traffic/yearly-avg/v1`, {
      params: { suburbs, startYear, endYear },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from population retrieval API");
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

app.post('/analyse', async (req, res) => {
  const platform = req.query.platform;
  const { content } = req.body;

  try {
    const prompt = generatePrompt(content, platform);
    const geminiResponse = await fetchGemini(prompt);

    return res.json({ insights: geminiResponse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate analysis' });
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
