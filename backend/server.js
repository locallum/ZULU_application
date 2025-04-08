const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const retrievalURL = 'https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/population/v1';
const visualisationURL = 'https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/population/visualisation/v1';

// Single suburb retrieval route
// successful URL: https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/population/v1?startYear=2021&endYear=2066&suburb=Liverpool
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

// Multiple suburbs retrieval route
// successful URL: https://slzykzeusf.execute-api.us-east-1.amazonaws.com/prod/populations/v1?startYear=2021&endYear=2050&suburbs=[Liverpool,Armidale]
app.get('/retrieve/multipleSuburbs', async (req, res) => {
    const { suburbs, startYear, endYear } = req.query;
    try {
        const response = await axios.get(
            retrievalURL,
            {
                params: { suburbs, startYear, endYear }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from retrieval API');
    }
});

// Single suburb visualisation route
// successful URL: https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/population/visualisation/v1?graphTitle=Liverpool%20Population%20Projection&x-header=Years&y-header=Population&x-data=2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2036,2041,2046,2051,2056,2061,2066&y-data=233912.19,239378.05,253279.83,261590.12,268915.72,276669.6,283950.03,290719.88,296212.44,301936.4,306509.47,337515.97,362980.3,383363.03,403680.66,423720.8,444072.1,464514.25
app.get('/visualisation/singleSuburb', async (req, res) => {
    const { title, x_header, y_header, x_data, y_data } = req.query;
    
    try {
        const response = await axios.get(visualisationURL, {
            params: {
                "graphTitle": title,
                "x-header": x_header,
                "y-header": y_header,
                "x-data": x_data,
                "y-data": y_data
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from visualisation API');
    }
});

// Multiple suburbs visualisation route
// successful URL: https://f8jc59emd2.execute-api.us-east-1.amazonaws.com/dev/populations/visualisation/v1?graphTitle=Population%20Growth%20Trends&x-header=Year&y-header=Population&labels=Armidale,Liverpool&x-data=2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2036,2041,2046&y-data=28705.0-28678.184-28723.336-28770.135-28810.877-28858.014-28900.588-28941.607-28980.953-29018.727-29055.068-29214.72-29339.824-29577.436,233912.19-239378.05-253279.83-261590.12-268915.72-276669.6-283950.03-290719.88-296212.44-301936.4-306509.47-337515.97-362980.3-383363.03
app.get('/visualisation/multipleSuburbs', async (req, res) => {
    const { title, x_header, y_header, labels, x_data, y_data } = req.query;
    try {
        const response = await axios.get(visualisationURL, {
            params: {
                "graphTitle": title,
                "x-header": x_header,
                "y-header": y_header,
                "labels": labels,
                "x-data": x_data,
                "y-data": y_data
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from visualisation API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});