import Grid from "@mui/material/Grid";
import GraphForm from "../components/GraphForm";
import GraphBox from "../components/GraphBox";
import MapboxMap from "../components/MapboxMap";
import "./Dashboard.css";

/**
 * The dashboard screen displays all main website content.
 */
const Dashboard = () => {
  return (
      <>
        <div id="suburb-select"></div>
        <MapboxMap />
    </>
  );
};

export default Dashboard;
