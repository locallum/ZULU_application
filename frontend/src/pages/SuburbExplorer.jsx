import { useEffect, useRef, useState } from "react";
import "./SuburbExplorer.css";
import GraphBox from "../components/GraphBox.jsx";
import MapboxMap from "../components/MapboxMap.jsx";
import ResultsPage from "../components/ResultsPage.jsx";

const Dashboard = () => {
  const [selected, setSelected] = useState([]);
  const [resultsImg, setResultsImg] = useState("")

  const resultsRef = useRef(null);

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

  useEffect(() => {
    if (resultsImg && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultsImg]);


  return (
    <>
      <GraphBox
        selected={selected}
        addSelected={addSelected}
        removeSelected={removeSelected}
        setResultsImg={setResultsImg}
      />
      <MapboxMap
        selected={selected}
        addSelected={addSelected}
        removeSelected={removeSelected}
      />
      <div ref={resultsRef} style={{ padding: "0px" }}>
        <ResultsPage
          selected={selected}
          resultsImg={resultsImg}
        />
      </div>
    </>
  );
};

export default Dashboard;
