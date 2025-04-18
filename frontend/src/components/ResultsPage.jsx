import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const styles = {
  page: {
    height: "100vh",
    paddingTop: "40px",
    paddingLeft: "60px",
    paddingRight: "60px",
  },
  download: {
    position: "absolute",
    right: "60px",
  },
};

const ResultsPage = ({ selected, resultsImg }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formatSuburbs = (suburbs) => {
    if (suburbs.length === 0) return "";
    if (suburbs.length === 1) return suburbs[0];
    if (suburbs.length === 2) return `${suburbs[0]} & ${suburbs[1]}`;
    return `${suburbs.slice(0, -1).join(", ")} & ${suburbs[suburbs.length - 1]}`;
  };

  const handleDownload = () => {
    setIsLoading(true);

    // Simulate a short delay to show loading state
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${resultsImg}`;
      link.download = `${selected.join("-")}.png`;
      link.click();
      setIsLoading(false);
    }, 1000); // adjust delay if necessary
  };

  if (resultsImg === "") return null;

  return (
    <div style={styles.page}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        sx={styles.download}
        onClick={handleDownload}
        loading={isLoading}
      >
        Download
      </Button>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "var(--accent)" }}
      >
        {formatSuburbs(selected)}
      </Typography>

      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Population Projection{selected.length > 1 ? "s" : ""}
      </Typography>

      {resultsImg && (
        <img
          src={`data:image/png;base64,${resultsImg}`}
          alt="Generated Graph"
          style={{ maxWidth: "40%", marginTop: "40px", borderRadius: "10px" }}
        />
      )}
    </div>
  );
};

export default ResultsPage;
