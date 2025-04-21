import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, 
  CardContent, 
  Button, 
  Box, 
  Typography,
  Snackbar, 
  Alert, 
  CircularProgress, 
  Avatar
} from '@mui/material';
import profileImage from '../assets/images/profileImg.jpg';

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [graphs, setGraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewIndex, setPreviewIndex] = useState(null);

  const fetchGraphs = async () => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (!token || !username) throw new Error('User not authenticated');

    const response = await axios.get('/retrieve/graphs', {
      params: { username },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.images;
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) setUserName(username);

    const name = localStorage.getItem('name');
    if (name) setName(name);

    fetchGraphs()
      .then(data => {
        setGraphs(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load graphs');
        setLoading(false);
      });
  }, []);

  const handleDownload = (filename, base64String) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64String}`;
    link.download = filename;
    link.click();
  };

  const handlePreview = (index) => {
    setPreviewIndex(previewIndex === index ? null : index);
  };

  const stripUsernameFromFilename = (filename, username) => {
    return filename.replace(`${username}-`, '');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="user-dashboard">
      <Box textAlign="center" mb={4}>
        <Avatar
          src={profileImage}
          alt="Profile"
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Hi, {name}👋!
        </Typography>
        <Typography variant="h6" gutterBottom>Your Saved Graphs</Typography>
      </Box>

      {graphs.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            You have not saved any graphs yet. Once you generate and save a graph, it will appear here!
          </Typography>
        </Box>
      ) : (
        <div className="graphs-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {graphs.map((graph, index) => (
            <Card key={index} sx={{ width: '100%', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  {stripUsernameFromFilename(graph.filename, userName)}
                </Typography>

                {previewIndex === index && (
                  <Box display="flex" justifyContent="center" my={2}>
                    <img
                      src={`data:image/png;base64,${graph.base64_image}`}
                      alt="Graph Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </Box>
                )}

                <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePreview(index)}
                    fullWidth
                  >
                    {previewIndex === index ? 'Hide Preview' : 'Preview'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDownload(graph.filename, graph.base64_image)}
                    fullWidth
                  >
                    Download
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Snackbar open={Boolean(error)} autoHideDuration={4000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
};

export default UserDashboard;