import Typography from "@mui/material/Typography";

const styles = {
  page: {
    height: "100vh",
    paddingTop: "40px",
    paddingLeft: "60px",
    paddingRight: "60px",
  },
};

const ResultsPage = ({ selected, resultsImg }) => {
  const formatSuburbs = (suburbs) => {
    if (suburbs.length === 0) return "";
    if (suburbs.length === 1) return suburbs[0];
    if (suburbs.length === 2) return `${suburbs[0]} & ${suburbs[1]}`;
    return `${suburbs.slice(0, -1).join(", ")} & ${suburbs[suburbs.length - 1]}`;
  };

  if (resultsImg === "") return null;

  return (
    <div style={styles.page}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "var(--accent)" }}
      >
        {formatSuburbs(selected)}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
      >
        Population Projection{selected.length > 1 ? "s" : ""}
      </Typography>
      {resultsImg && (
        <img
          src={`data:image/png;base64,${resultsImg}`}
          alt="Generated Graph"
          style={{ maxWidth: "100%", marginTop: "40px", borderRadius: "10px" }}
        />
      )}
    </div>
  );
};

export default ResultsPage;
