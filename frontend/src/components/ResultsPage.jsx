import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import {
  Typography,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

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
  upload: {
    position: "absolute",
    right: "240px",
  },
};

const ResultsPage = ({ selected, resultsImg }) => {
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });

  const showSnackBar = (message, severity = 'info') => {
    setSnack({ open: true, message, severity });
  };

  const formatSuburbs = (suburbs) => {
    if (suburbs.length === 0) return "";
    if (suburbs.length === 1) return suburbs[0];
    if (suburbs.length === 2) return `${suburbs[0]} & ${suburbs[1]}`;
    return `${suburbs.slice(0, -1).join(", ")} & ${suburbs[suburbs.length - 1]}`;
  };

  const handleDownload = () => {
    setIsDownloadLoading(true);

    // Simulate a short delay to show loading state
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${resultsImg}`;
      link.download = `${selected.join("-")}.png`;
      link.click();
      setIsDownloadLoading(false);
    }, 1000); // adjust delay if necessary
  };

  const handleUpload = async () => {
    setIsUploadLoading(true);
  
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
  
    if (!token || !username) {
      showSnackBar('User not authenticated', 'error');
      setIsLoading(false);
      return;
    }
  
    try {
      await axios.post(
        '/save/graph',
        {
          suburbs: selected,
          username,
          image_base64: resultsImg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackBar('Graph saved to cloud successfully!', 'success');
    } catch (error) {
      console.error(error);
      showSnackBar('Failed to upload graph', 'error');
    } finally {
      setIsUploadLoading(false);
    }
  };

  if (resultsImg === "") return null;

  return (
    <>
      <div style={styles.page}>
        {localStorage.getItem('access_token') && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CloudUploadIcon />}
            sx={styles.upload}
            onClick={handleUpload}
            loading={isUploadLoading}
          >
            Save to Cloud
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          sx={styles.download}
          onClick={handleDownload}
          loading={isDownloadLoading}
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
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResultsPage;
