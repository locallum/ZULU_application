import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";

import SuburbOptions from "../assets/SuburbOptions";

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

  const graphBoxStyle = {
    position: "absolute",
    top: "100px",
    left: "auto",
    right: "30px",
    width: "360px",
    height: "570px",
    background: "white",
    zIndex: "999",
    borderRadius: "20px",
    opacity: "80%",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  const switchStyle = {
    width: "260px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: "20px",
    border: "grey solid 2px",
    margin: "0 auto",
    mb: 2,
    height: "40px",
  };

  const dropdownHint = {
    fontFamily: "Montserrat, sans-serif, system-ui",
    paddingLeft: "10px",
    paddingRight: "10px",
    mb: 1,
  };

  const handleReset = () => {
    setAutocompleteValue(null);
    setStartYear("");
    setEndYear("");
    SuburbOptions.forEach((suburb) => removeSelected(suburb));
  };

  const generateGraph = () => {
    // Implement your graph generation logic using selected, startYear, endYear
    console.log("Generating graph with:", selected, startYear, endYear);
  };

  return (
    <div style={graphBoxStyle}>
      <FormControl fullWidth sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={switchStyle}>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif, system-ui" }}>
            Single
          </Typography>
          <Switch
            checked={isMultiple}
            onChange={(e) => {
              setIsMultiple(e.target.checked);
            }}
            inputProps={{ "aria-label": "select mode" }}
          />
          <Typography sx={{ fontFamily: "Montserrat, sans-serif, system-ui" }}>
            Multiple
          </Typography>
        </Stack>

        <Typography sx={dropdownHint}>
          Select suburbs on the map, or search using the dropdown menu below:
        </Typography>

        <Autocomplete
          options={SuburbOptions}
          value={autocompleteValue}
          onChange={(event, newValue) => {
            setAutocompleteValue(newValue);
            if (newValue) addSelected(newValue);
            setAutocompleteValue(null);

            // Blur the input field
            if (event?.target) {
              const input = document.activeElement;
              if (input instanceof HTMLElement) {
                input.blur();
              }
            }
          }}
          disabled={isMultiple ? selected.length >= 3 : selected.length >= 1}
          renderInput={(params) => (
            <TextField {...params} label="Select an item" />
          )}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: isMultiple ? "120px" : "40px",
            //border: "solid 2px black",
            borderRadius: "18px",
            overflowY: "auto",
            marginTop: "16px",
          }}
        >
          {selected.map((suburb, index) => (
            <Chip
              key={index}
              label={suburb}
              onDelete={() => removeSelected(suburb)}
              color="primary"
              sx={{ mb: "6px" }}
            />
          ))}
        </div>

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
        <Button variant="outlined" sx={{ mt: 1 }} onClick={handleReset}>
          Reset
        </Button>
      </FormControl>
    </div>
  );
};

export default GraphBox;
