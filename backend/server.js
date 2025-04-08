const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const retrievalURL = 'https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/population/v1';
const visualisationURL = 'https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/population/visualisation/v1';

// Route for handling the retrieval API request
app.get('/retrieve/singleSuburb', async (req, res) => {
    const { suburb, startYear, endYear } = req.query;
    try {
        const response = await axios.get(
            retrievalURL,
            {
                params: { suburb, startYear, endYear }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from retrieval API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});