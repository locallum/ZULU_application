import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, Chip, FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";

import SuburbOptions from "../assets/SuburbOptions";

const styles = {
  graphBox: {
    position: "absolute",
    top: "100px",
    right: "30px",
    width: "360px",
    background: "var(--background-primary)",
    zIndex: 999,
    borderRadius: "20px",
    opacity: "97%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  switchContainer: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    paddingBottom: "30px",
    // borderRadius: "4px",
    // backgroundColor: "var(--subtle)",
    borderBottom: "1px solid var(--subtle)",
    margin: "0 auto",
    height: "40px",
    mb: "20px",
  },
  dropdownHint: {
    fontFamily: "Montserrat, sans-serif, system-ui",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginBottom: "8px",
  },
  chipContainer: (isMultiple) => ({
    height: isMultiple ? "120px" : "40px",
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
  }),
  chip: {
    borderRadius: "10px",
    height: "32px",
  },
  fontFamily: {
    fontFamily: "Montserrat, sans-serif, system-ui",
  },
  buttonSpacing: {
    marginTop: "8px",
  },
};

const GraphBox = ({
  isMultiple,
  setIsMultiple,
  selected,
  addSelected,
  removeSelected,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  // Reset form input values
  const handleReset = () => {
    setAutocompleteValue(null);
    setStartYear("");
    setEndYear("");
    SuburbOptions.forEach((suburb) => removeSelected(suburb));
  };

  const generateGraph = async () => {
    try {
      const params = new URLSearchParams({
        startYear: startYear,
        endYear: endYear,
      });
      params.append("suburbs", `[${selected}]`);
      console.log(params.toString()); // check final URL

      const response = await fetch(`/retrieve/singleSuburb?${params}`);

      const data = await response.json();
      console.log(data.suburbsPopulationEstimates[0]);

      let graphTitle = "Population Projection: ";
      data.suburbsPopulationEstimates.forEach((suburb) => {
        graphTitle += `${suburb.suburb} `;
      })

      const labels = data.suburbsPopulationEstimates
          .map((suburb) => suburb.suburb)
          .join(',');

      const yData = data.suburbsPopulationEstimates
          .map((suburb) => suburb.estimates.join('-'))
          .join(',');


      const visParams = new URLSearchParams();
      visParams.append("title", graphTitle);
      visParams.append("x_header", "Years");
      visParams.append("y_header", "Population");
      visParams.append("labels", labels);
      visParams.append("x_data", data.suburbsPopulationEstimates[0].years);
      visParams.append("y_data", yData);

      console.log(visParams.toString());

      const visResponse = await fetch(`/visualisation/singleSuburb?${visParams}`);

      const visData = await visResponse.json();
      console.log(visData);

      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={styles.graphBox}>
      <FormControl fullWidth sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={styles.switchContainer}>
          <Typography sx={styles.fontFamily}>Single</Typography>
          <Switch
            checked={isMultiple}
            onChange={(e) => setIsMultiple(e.target.checked)}
            inputProps={{ "aria-label": "select mode" }}
          />
          <Typography sx={styles.fontFamily}>Multiple</Typography>
        </Stack>

        <Typography sx={styles.dropdownHint}>
          Select {isMultiple ? "up to 3 suburbs" : "a suburb"} on the map, or
          search using the dropdown menu below:
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
          disabled={isMultiple ? selected.length >= 3 : selected.length >= 1}
          renderInput={(params) => (
            <TextField {...params} label="Select an item" />
          )}
        />

        <div style={styles.chipContainer(isMultiple)}>
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
          Select a year range between 2021 and 2066:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 1 }}>
          <TextField
            label="Start Year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            fullWidth
          />
          <TextField
            label="End Year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            fullWidth
          />
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 2, height: "45px" }}
          onClick={generateGraph}
        >
          Generate
        </Button>
        <Button
          variant="outlined"
          sx={styles.buttonSpacing}
          onClick={handleReset}
        >
          Reset
        </Button>
      </FormControl>
    </div>
  );
};

export default GraphBox;
