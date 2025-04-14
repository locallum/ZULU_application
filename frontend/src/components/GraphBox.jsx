import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { TextField, Autocomplete, Chip } from "@mui/material";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import options from "../assets/SuburbOptions";

const GraphBox = ({ isMultiple, setIsMultiple }) => {
  const graphBoxStyle = {
    position: "absolute",
    top: "100px",
    left: "auto",
    right: "30px",
    width: "360px",
    height: "550px",
    background: "grey",
    zIndex: "999",
    borderRadius: "20px",
    opacity: "80%",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
  };

  return (
    <div style={graphBoxStyle}>
      <FormControl fullWidth>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Single</Typography>
          <Switch
            checked={isMultiple}
            onChange={(e) => {
              setIsMultiple(e.target.checked);
            }}
            inputProps={{ "aria-label": "select mode" }}
          />
          <Typography>Multiple</Typography>
        </Stack>
        
      </FormControl>
    </div>
  );
};

export default GraphBox;
