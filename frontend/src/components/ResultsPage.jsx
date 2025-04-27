import { useState, useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import {
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  CircularProgress
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

const ResultsPage = ({ selected, resultsImg, analysisData, platform, targetRef }) => {
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  const showSnackBar = (message, severity = 'info') => {
    setSnack({ open: true, message, severity });
  };

  const formatSuburbs = (suburbs) => {
    if (suburbs.length === 0) return "";
    if (suburbs.length === 1) return suburbs[0];
    if (suburbs.length === 2) return `${suburbs[0]} & ${suburbs[1]}`;
    return `${suburbs.slice(0, -1).join(", ")} & ${suburbs[suburbs.length - 1]}`;
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisData) return;
  
      try {
        const response = await axios.post(`/analyse?platform=${platform}`, {
          content: analysisData,
        });
        setAnalysis(response.data.insights);
      } catch (error) {
        console.error(error);
        setAnalysis("Failed to fetch analysis.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalysis();
  }, [analysisData, platform]);

  
  function formatAnalysis(responseText) {
    const bulletRegex = /(?:^|\n)(\*|\d+\.)\s+/g;
  
    // Find first bullet to trim intro
    const firstBulletMatch = responseText.match(bulletRegex);
    const firstBulletIndex = firstBulletMatch ? responseText.indexOf(firstBulletMatch[0]) : 0;
  
    const trimmedText = responseText.slice(firstBulletIndex).trim();
  
    // Split by bullets (including lines starting with *, - or numbered bullets)
    const bulletLines = trimmedText.split(/(?:^|\n)(?:\*|\d+\.)\s+/).filter(Boolean);
  
    return bulletLines.map((line, index) => (
      <li
        key={index}
        style={{ marginBottom: '12px', fontFamily: 'Montserrat, sans-serif' }}
        dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<strong>$1</strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }}
      />
    ));
  }  
  


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
      setIsUploadLoading(false);
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

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          gap={12}
          mt={5}
        >
          {/* Graph */}
          <Box
            ref={targetRef}
            sx={{ maxWidth: "50%", borderRadius: "10px" }}
          >
            <img
              src={`data:image/png;base64,${resultsImg}`}
              alt="Generated Graph"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>

          {/* Insights */}
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minWidth="280px"
            >
              <CircularProgress />
              <Typography mt={2} fontFamily="Montserrat">
                Generating analysis...
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                bgcolor: "#f9fafb",
                p: 4,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                maxWidth: "50%",
                fontFamily: "Montserrat",
                mt: 2
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily="Montserrat">
                Insights
              </Typography>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {formatAnalysis(analysis)}
              </ul>
            </Box>
          )}
        </Box>



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
