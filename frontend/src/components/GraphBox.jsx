/**
 * GraphBox displays a graph visualisation of retrieved data.
 */
const GraphBox = () => {
  // CSS styling for GraphBox
  const graphBoxStyle = {
    height: "100%",
    border: "1px black solid",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    boxSizing: "border-box",
  };

  return (
    <>
      <div style={graphBoxStyle}>
        Graph box
      </div>
    </>
  );
};

export default GraphBox;
