import { useEffect, useState } from "react";
import GraphBox from "../components/GraphBox";
import MapboxMap from "../components/MapboxMap";
import "./Dashboard.css";

const Dashboard = () => {
  let selectedSuburbs = [];
  const [isMultiple, setIsMultiple] = useState(false);

  const changeSelectedSuburbs = (event, value) => {
    if (isMultiple) {
      selectedSuburbs = value;
    } else {
      selectedSuburbs.push = [value];
    }
  }

  return (
    <>
      <GraphBox
        isMultiple={isMultiple}
        setIsMultiple={setIsMultiple}
        changeSelectedSuburbs={changeSelectedSuburbs}
      />{" "}
      <MapboxMap />
    </>
  );
};

export default Dashboard;
