import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";

import SuburbOptions from "../assets/SuburbOptions";

const styles = {
  graphBox: {
    position: "absolute",
    top: "95px",
    right: "30px",
    width: "360px",
    background: "var(--background-primary)",
    zIndex: 999,
    borderRadius: "20px",
    opacity: "97%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.75)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  dropdownHint: {
    fontFamily: "Montserrat, sans-serif, system-ui",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginBottom: "8px",
  },
  chipContainer: {
    height: "120px",
    border: "var(--subtle) solid 1px",
    borderRadius: "8px",
    overflowY: "auto",
    margin: "16px 0px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "8px",
  },
  chip: {
    borderRadius: "10px",
    height: "28px",
  },
  fontFamily: {
    fontFamily: "Montserrat, sans-serif, system-ui",
  },
  buttonSpacing: {
    marginTop: "8px",
  },
};

const GraphBox = ({
  selected,
  addSelected,
  removeSelected,
  setResultsImg,
  setAnalysisData,
  platform,
  setPlatform
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  // const [platform, setPlatform] = useState("population");
  const [loading, setLoading] = useState(false);
  const [startYearError, setStartYearError] = useState("");
  const [endYearError, setEndYearError] = useState("");


  const handleReset = () => {
    setAutocompleteValue(null);
    setStartYear("");
    setEndYear("");
    setResultsImg("");
    setStartYearError("");
    setEndYearError("");
    SuburbOptions.forEach((suburb) => removeSelected(suburb));
  };

  function formatPopulationData(data) {
    const { suburbsPopulationEstimates } = data;

    return suburbsPopulationEstimates.map(suburbData => {
      const suburb = suburbData.suburb;
      const estimates = JSON.stringify(suburbData.estimates);
      const years = JSON.stringify(suburbData.years);
      return `Suburb: ${suburb}\nEstimates: ${estimates}\nYears: ${years}`;
    }).join("\n\n");
  }

  function formatTrafficData(data) {
    const { suburbsAvgTraffic } = data;

    return suburbsAvgTraffic.map(suburbData => {
      const suburb = suburbData.suburb;
      const estimates = JSON.stringify(suburbData.avg_traffic);
      const years = JSON.stringify(suburbData.years);
      return `Suburb: ${suburb}\navg_traffic_count: ${estimates}\nYears: ${years}`;
    }).join("\n\n");
  }


  const generateGraph = async () => {
    // Reset previous error messages
    setStartYearError("");
    setEndYearError("");

    let hasError = false;
    const start = parseInt(startYear);
    const end = parseInt(endYear);

    const minYear = platform === "traffic" ? 2006 : 2021;
    const maxYear = platform === "traffic" ? 2020 : 2066;

    if (isNaN(start) || start < minYear || start > maxYear) {
      setStartYearError(`Start year must be between ${minYear} and ${maxYear}`);
      hasError = true;
    }

    if (isNaN(end) || end < minYear || end > maxYear) {
      setEndYearError(`End year must be between ${minYear} and ${maxYear}`);
      hasError = true;
    }


    if (!hasError && start > end) {
      setStartYearError("Start year must be less than or equal to end year");
      setEndYearError("End year must be greater than or equal to start year");
      hasError = true;
    }

    if (hasError) return;

    if (platform === "population") {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          startYear: startYear,
          endYear: endYear,
        });
        params.append("suburbs", `[${selected}]`);

        const response = await fetch(`/retrieve/population?${params}`);
        const data = await response.json();
        console.log(data);

        let graphTitle = "Population Projection: ";
        data.suburbsPopulationEstimates.forEach((suburb) => {
          graphTitle += `${suburb.suburb} `;
        });

        const labels = data.suburbsPopulationEstimates
          .map((suburb) => suburb.suburb)
          .join(",");

        const yData = data.suburbsPopulationEstimates
          .map((suburb) => suburb.estimates.join("-"))
          .join(",");

        setAnalysisData(formatPopulationData(data));

        const visParams = new URLSearchParams();
        visParams.append("title", graphTitle);
        visParams.append("x_header", "Years");
        visParams.append("y_header", "Population");
        visParams.append("labels", labels);
        visParams.append("x_data", data.suburbsPopulationEstimates[0].years);
        visParams.append("y_data", yData);

        const visResponse = await fetch(`/visualisation?${visParams}`, {
          method: 'POST'
        });
        const visData = await visResponse.json();
        const parsedVisData = JSON.parse(visData.body);

        setResultsImg(parsedVisData.image);
        return data;
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    } else if (platform === "traffic") {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          startYear: startYear,
          endYear: endYear,
        });
        params.append("suburbs", `${selected}`);
        const response = await fetch(`/retrieve/traffic?${params}`);
        const data = await response.json();
        console.log("DATA:", data);


        let graphTitle = "Traffic History: ";
        data.suburbsAvgTraffic.forEach((suburb) => {
          graphTitle += `${suburb.suburb} `;
        });

        const labels = data.suburbsAvgTraffic
          .map((suburb) => suburb.suburb)
          .join(",");

        const yData = data.suburbsAvgTraffic
          .map((suburb) => suburb.avg_traffic.join("-"))
          .join(",");

        console.log(data.suburbsAvgTraffic[0].years);
        console.log(yData);

        setAnalysisData(formatTrafficData(data));

        const visParams = new URLSearchParams();
        visParams.append("title", graphTitle);
        visParams.append("x_header", "Years");
        visParams.append("y_header", "Yearly avg traffic count");
        visParams.append("labels", labels);
        visParams.append("x_data", data.suburbsAvgTraffic[0].years);
        visParams.append("y_data", yData);

        const visResponse = await fetch(`/visualisation?${visParams}`, {
          method: 'POST'
        });
        const visData = await visResponse.json();
        const parsedVisData = JSON.parse(visData.body);

        setResultsImg(parsedVisData.image);

        return data;
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.graphBox}>
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={platform}
        fullWidth
        onChange={(event, newValue) => {
          if (newValue !== null) {
            handleReset(); // Reset inputs when platform changes
            setPlatform(newValue);
          }
        }}
        aria-label="Platform"
        sx={{ height: "45px" }}
      >
        <ToggleButton value="population">Population</ToggleButton>
        <ToggleButton value="traffic">Traffic</ToggleButton>
      </ToggleButtonGroup>


      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <FormControl fullWidth sx={{ p: 2 }}>
          <Typography sx={styles.dropdownHint}>
            Select up to 3 suburbs on the map, or search using the dropdown menu below:
          </Typography>

          <Autocomplete
            options={SuburbOptions}
            value={autocompleteValue}
            onChange={(event, newValue) => {
              setAutocompleteValue(newValue);
              if (newValue) addSelected(newValue);
              setAutocompleteValue(null);
              if (event?.target) {
                const input = document.activeElement;
                if (input instanceof HTMLElement) input.blur();
              }
            }}
            disabled={selected.length >= 3}
            renderInput={(params) => (
              <TextField {...params} label="Select an item" />
            )}
          />

          <div style={styles.chipContainer}>
            {selected.map((suburb, index) => (
              <Chip
                key={index}
                label={suburb}
                onDelete={() => removeSelected(suburb)}
                sx={styles.chip}
              />
            ))}
          </div>

          <Typography sx={styles.dropdownHint}>
            Select a year range between {platform === "traffic" ? "2006 and 2020" : "2021 and 2066"}:
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 1 }}>
            <TextField
              label="Start Year"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              error={!!startYearError}
              helperText={startYearError}
              fullWidth
            />
            <TextField
              label="End Year"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              error={!!endYearError}
              helperText={endYearError}
              fullWidth
            />
          </Box>

          <Button
            loading={loading}
            variant="contained"
            sx={{ mt: 2, height: "45px" }}
            onClick={generateGraph}
          >
            Generate results
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default GraphBox;
