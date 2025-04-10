import Grid from "@mui/material/Grid";
import GraphBox from "../components/GraphBox";

/**
 * The dashboard screen displays all main website content.
 */
const Dashboard = () => {
  return (
    <>
      <div className="page-contents">
        <h1>
          Population Data Projection
        </h1>
        <Grid container spacing={2} sx={{ width: '100%', flexGrow: 1 }}>
          <Grid size={4}>
            <div>Form</div>
          </Grid>
          <Grid size={8}>
            <GraphBox />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
