import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';

import profileImage from '../assets/images/profileImg.jpg';

// Styled text nav buttons
const TextButton = styled(Button)({
  color: "white",
  "&:hover": {
    backgroundColor: "#177be0",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewGraphs = () => {
    navigate('/dashboard');
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose();
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header-container">
      <h2>ZULU Urban Metrics</h2>

      <nav className="flex-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <TextButton variant="text" component={Link} to="/">
          Home
        </TextButton>
        <TextButton variant="text" component={Link} to="/explorer">
          Suburb Explorer
        </TextButton>
        <TextButton
          variant="text"
          href="https://app.swaggerhub.com/apis/zulu-89f/Zulu_transport_API/1.0.0"
          target="_blank"
        >
          APIs
        </TextButton>

        {/* Conditionally render profile img or login button */}
        {isLoggedIn ? (
          <Box>
            <IconButton onClick={handleMenuClick}>
              <Avatar src={profileImage} sx={{ width: 36, height: 36 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleViewGraphs}>View Saved Graphs</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
