import { useEffect, useState } from "react";
import "./SuburbExplorer.css";
import GraphBox from "../components/GraphBox.jsx";
import MapboxMap from "../components/MapboxMap.jsx";

const Dashboard = () => {
  const [selected, setSelected] = useState([]);

  const addSelected = (newValue) => {
    setSelected((prevSelected) => {
      if (!prevSelected.includes(newValue)) {
        if (prevSelected.length < 3) {
          return [...prevSelected, newValue];
        }
      }
      return prevSelected;
    });
  };

  const removeSelected = (valueToRemove) => {
    setSelected((prevSelected) =>
      prevSelected.filter((value) => value !== valueToRemove)
    );
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <GraphBox
        selected={selected}
        addSelected={addSelected}
        removeSelected={removeSelected}
      />
      <MapboxMap
        selected={selected}
        addSelected={addSelected}
        removeSelected={removeSelected}
      />
    </>
  );
};

export default Dashboard;
