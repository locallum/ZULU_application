import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// A MUI Toolbar component with custom styles applied
const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  border: '1px solid',
  // backgroundColor: 'gray',
  padding: '8px 12px',
}));

/**
 * The header component contains a navigation bar with a login button.
 */
const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'transparent', flexGrow: 1 }}>
      <StyledToolbar>
        <h2>ZULU Urban Metrics</h2>

        <Button variant="text" onClick={() => navigate('/')}>
          Dashboard
        </Button>

        <Divider orientation="vertical" variant="middle" flexItem sx={{ flexGrow: 1 }} />

        <Button variant="contained" onClick={() => navigate('/login')}>
          Login
        </Button>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
