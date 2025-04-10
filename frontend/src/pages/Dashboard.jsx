import Grid from "@mui/material/Grid";
import GraphForm from "../components/GraphForm";
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
        <Grid container spacing={8} sx={{ width: '100%', flexGrow: 1 }}>
          <Grid size={4}>
            <GraphForm />
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
