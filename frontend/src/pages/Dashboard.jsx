import { useEffect, useState } from "react";
import GraphBox from "../components/GraphBox";
import MapboxMap from "../components/MapboxMap";
import "./Dashboard.css";

const Dashboard = () => {
  const [selected, setSelected] = useState([]);
  const [isMultiple, setIsMultiple] = useState(false);

  const addSelected = (newValue) => {
    setIsMultiple((prevIsMultiple) => {
      if (prevIsMultiple) {
        setSelected((prevSelected) => {
          if (!prevSelected.includes(newValue) && prevSelected.length < 3) {
            return [...prevSelected, newValue];
          }
          return prevSelected;
        });
      } else {
        setSelected(() => [newValue]);
      }
      return prevIsMultiple;
    });
  };

  const removeSelected = (valueToRemove) => {
    setSelected((prevSelected) => {
      return prevSelected.filter((value) => value !== valueToRemove);
    });
  };

  useEffect(() => {
    setSelected([]);
  }, [isMultiple]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <GraphBox
        isMultiple={isMultiple}
        setIsMultiple={setIsMultiple}
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
