import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Full list of available suburbs
const suburbs = [
  'Albury',
  'Armidale',
  'Ballina',
];

/**
 * GraphForm displays a form with input fields.
 */
const GraphForm = () => {
  // CSS styling for GraphForm
  const graphFormStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  const buttonGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <>
      <FormControl style={graphFormStyle}>

        <Autocomplete
          options={suburbs}
          id="suburb-select"
          renderInput={(params) => (
            <TextField {...params} label="Suburb" variant="outlined" />
          )}
        />

        <div>
          <div className="flex-row">
            <TextField
              type="number"
              id="start-year"
              label="Start Year"
              defaultValue="2025"
            />
            <TextField
              type="number"
              id="end-year"
              label="End Year"
              defaultValue="2066"
            />
          </div>
          <FormHelperText>
            Please select a year between 2021 and 2066
          </FormHelperText>
        </div>

        <TextField id="graph-title" label="Graph Title" variant="outlined" />

        <div style={buttonGroupStyle}>
          <Button type="submit" variant="contained">Generate</Button>
          <Button variant="outlined" endIcon={<RestartAltIcon />}>Reset all</Button>
        </div>

      </FormControl>
    </>
  );
};

export default GraphForm;
